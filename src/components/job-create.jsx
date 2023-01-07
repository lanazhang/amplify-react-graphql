import React, { useState, useEffect } from 'react';
import {
  Alert,
  AppLayout,
  Box,
  BreadcrumbGroup,
  Button,
  ColumnLayout,
  Container,
  ContentLayout,
  Flashbar,
  FormField,
  Header,
  Input,
  Link,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components';

function JobCreate ({onSubmit, onDismiss}) {
  const handleSubmit = event => {

  }

    return (<Modal
      visible={true}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
      header="Create a transcription job"
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary" onClick={onSubmit}>
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
              value=""
              ariaRequired={true}
            />
          </FormField>
          <br/>
          <SpaceBetween size="m">
          <FormField label='Upload a audio file:'>
            <input type="file" name="file" />
          </FormField>
          </SpaceBetween>
          <br/>
        </form>
      </ColumnLayout>

    </Modal>
  );
}

export {JobCreate};