import { useState, useRef } from "react";
import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import TextFilter from "@cloudscape-design/components/text-filter";
import Pagination from "@cloudscape-design/components/pagination";
import Button from "@cloudscape-design/components/button";
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from './job-list-config';
import { useLocalStorage } from '../common/localStorage.js';
import { useColumnWidths } from './commons/use-column-widths';
import { JobCreate } from './job-create';
import { TableHeader } from './commons/common-components';
import { SpaceBetween } from '@cloudscape-design/components';
import { JobDetail } from './job-detail';
import Cards from "@cloudscape-design/components/cards";

export default (onItemClick) => {
  const [items, setItems] = useState([
    {
      "name": "Test Transcribe job for Toxicity classification",
      "status": "Completed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)",
      "language": "English, US (en-US)",
      "expiration": "The transcription is available for 75 more days.",
      "started": "2022-12-22, 4:41:33 p.m.",
      "ended": "2022-12-22, 4:42:33 p.m.",
      "avg_toxicity_score":"84.4%",
      "format": "wav",
      "rate": "22050 Hz",
      "input_s3_uri": "s3://sagemaker-us-east-1-122702569249/content-moderation-im/audio-moderation/speech_20220922175040855.wav",
      "output_s3_uri": "s3://sagemaker-us-east-1-122702569249/content-moderation-im/audio-moderation/transcribe-toxicity-modertion-job.json",
      "toxicity": {"toxicityDetection":[{"text":"So many haters on the Internet. I didn't get what was so bad about this video. I think you're just jealous. Fuck human. Get ready to take this hard ass test. I'm tired of these bad ass kids. Damn, that's a shitload of guns.","toxicity":0.844,"categories":{"PROFANITY":0.9971,"HATE_SPEECH":0.0846,"SEXUAL":0.0103,"INSULT":0.7233,"VIOLENCE_OR_THREAT":0.0107,"GRAPHIC":0.0068,"HARASSMENT_OR_ABUSE":0.0696},"start_time":0,"end_time":13.56},{"text":"So many haters on the Internet. I didn't get what was so bad about this video. I think you're just jealous. Fuck human. Get ready to take this hard ass test. I'm tired of these bad ass kids. Damn, that's a shitload of guns.","toxicity":0.934,"categories":{"PROFANITY":0.9971,"HATE_SPEECH":0.0846,"SEXUAL":0.0103,"INSULT":0.7233,"VIOLENCE_OR_THREAT":0.0107,"GRAPHIC":0.0068,"HARASSMENT_OR_ABUSE":0.0696},"start_time":0,"end_time":13.56}]}
    },
    {
      "name": "Test Transcribe job 2",
      "status": "In Progress",
      "created": "Jan 4 2023, 12:41 (UTC-05:00)"
    },
    {
      "name": "Test Transcribe job 3",
      "status": "Completed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)"
    },
    {
      "name": "Test Transcribe job 4",
      "status": "Completed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)"
    },
    {
      "name": "Test Transcribe job 5",
      "status": "Completed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)"
    },
    {
      "name": "Test Transcribe job 6",
      "status": "Completed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)"
    },
    {
      "name": "Test Transcribe job 7",
      "status": "Failed",
      "created": "Jan 5 2023, 16:41 (UTC-05:00)"
    }
  ]);

  const [ selectedItems, setSelectedItems ] = useState([]);
  const [preferences, setPreferences] = useLocalStorage('React-DistributionsTable-Preferences', DEFAULT_PREFERENCES);
  const [columnDefinitions, saveWidths] = useColumnWidths('React-Table-Widths', COLUMN_DEFINITIONS);
  const appLayout = useRef();

  const [showCreate, setShowCreate] = useState(false); 
  const [showDetail, setShowDetail] = useState(false); 

  const handleCreate = event => {
    setShowCreate(true);
  }
  const handleCloseCreate = event => {
    setShowCreate(false);
  }

  const handleViewDetail = e => {
    setShowDetail(true);
  }

  const handleBackToList = e => {
    setShowDetail(false);
  }

    return (
      <div> <br/>
      {showCreate?<JobCreate onDismiss={handleCloseCreate}/>:<div/>}
      {showDetail?<JobDetail job={selectedItems[0]} onBack={handleBackToList} />:
        <Table
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(
              i => i.name === item.name
            ).length;
            return `${item.name} is ${
              isItemSelected ? "" : "not"
            } selected`;
          }
        }}
        columnDefinitions={columnDefinitions}
        items={items}
        loadingText="Loading resources"
        selectionType="single"
        trackBy="name"
        visibleColumns={preferences.visibleContent}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box
              padding={{ bottom: "s" }}
              variant="p"
              color="inherit"
            >
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find resources"
            filteringText=""
          />
        }
        header={
          <TableHeader
          variant="awsui-h1-sticky"
          title="Transcription jobs"
          actionButtons={
            <SpaceBetween size="xs" direction="horizontal">
              <Button onClick={handleViewDetail} disabled={selectedItems.length === 0} >View details</Button> 
              {/* <Button disabled={!isOnlyOneSelected}>Edit</Button>
              <Button disabled={props.selectedItems.length === 0}>Delete</Button>*/}
              <Button variant="primary" onClick={handleCreate}>Create a new job</Button>
            </SpaceBetween>
          }
        />
        }
        pagination={
          <Pagination
            currentPageIndex={1}
            pagesCount={2}
            ariaLabels={{
              nextPageLabel: "Next page",
              previousPageLabel: "Previous page",
              pageLabel: pageNumber =>
                `Page ${pageNumber} of all pages`
            }}
          />
        }
        preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
        />}
    </div>
  );
}