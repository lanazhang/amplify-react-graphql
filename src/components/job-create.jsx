import React, { useState, useEffect } from 'react';
import { Box, Button, ColumnLayout, FormField, Input, Modal, SpaceBetween, Alert} from '@cloudscape-design/components';
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const REGION = "us-west-2";

function readFileDataAsBase64(e) {
  const file = e.target.files[0];

  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
          resolve(event.target.result);
      };

      reader.onerror = (err) => {
          reject(err);
      };

      reader.readAsDataURL(file);
  });
}

function JobCreate ({jobNames, onDismiss}) {
  const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [preSignedUrl, setPreSignedUrl] = useState(null);
  const [jobName, setJobName] = useState("");
  const [fileBytes, setFileBytes] = useState(undefined);
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    console.log(e.target);
    if (jobName === "")
      setMessage("Job name cannot be empty");
    else if (jobNames.includes(jobName))
      setMessage("Job name already exits");
    else if(fileBytes === undefined)
      setMessage("Please select a file");
    else {
      const s3Client = new S3Client({ 
        region: REGION, 
        accessKeyId: preSignedUrl.fields.AWSAccessKeyId,
        secretAccessKey: preSignedUrl.fields["x-amz-security-token"]
      });
      try {
        const data = s3Client.send(
          new PutObjectCommand({
            Bucket: preSignedUrl["fields"]["bucket"],
            Key: preSignedUrl["fields"]["key"],
            Body: fileBytes
          })
        );
        return data; // For unit tests.
      } catch (err) {
        console.log("Error putting object", err);
      }
    }

  }

  const handleFileChange = e => {
    if (e.target.files) {
      setFileBytes(readFileDataAsBase64(e));

      if (jobName.length === 0) setJobName(e.target.files[0].name.split('.')[0]);
      // Get pre-signed URL
      fetch(AUTH_SERVICE_URL + 's3/pre-signed-url', {
        method: 'POST',
        body: JSON.stringify({
          file_name: jobName + e.target.files[0].name.split('.')[1]
         }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
           'x-api-key': API_KEY
        },
        })
        .then((response) => response.json())
        .then((data) => {
            var resp = JSON.parse(data.body)
            setPreSignedUrl(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    
    }
  }

  const handleJobNameChange = e => {
    setJobName(e.detail.value.trim());
  }

    return (<Modal
      visible={true}
      onSubmit={handleSubmit}
      onDismiss={onDismiss}
      header="Create a transcription job"
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="normal" onClick={onDismiss}>
              Cancel
            </Button>
          </SpaceBetween>
        </Box>
      }>
      <ColumnLayout columns={2}>
        <form onSubmit={handleSubmit}>
          <FormField label='Job name:'>
            <Input
              placeholder='Transcription job name'
              value={jobName}
              onChange={handleJobNameChange}
              ariaRequired={true}
            />
            {message? <Box color='text-status-error'>{message}</Box>: <div/>}
          </FormField>
          <br/>
          <SpaceBetween size="m">
          <FormField label='Upload a audio file:'>
            <input type="file" name="file" onChange={handleFileChange} accept=".wav,.mp3"/>
          </FormField>
          </SpaceBetween>
          <br/>
        </form>
      </ColumnLayout>

    </Modal>
  );
}

export {JobCreate};