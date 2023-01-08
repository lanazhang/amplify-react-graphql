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
import { API } from "aws-amplify";

export default (onItemClick) => {
  const [items, setItems] = useState([
      {
        "name": "toxicity-job-sample-audio-15",
        "created": "2023-01-07 02:14:55 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:55 AM",
        "ended": "2023-01-07 02:15:17 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-14",
        "created": "2023-01-07 02:14:46 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:46 AM",
        "ended": "2023-01-07 02:15:01 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-12",
        "created": "2023-01-07 02:14:35 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:35 AM",
        "ended": "2023-01-07 02:14:54 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-11",
        "created": "2023-01-07 02:14:25 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:25 AM",
        "ended": "2023-01-07 02:15:12 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-10",
        "created": "2023-01-07 02:14:15 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:15 AM",
        "ended": "2023-01-07 02:14:32 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-9",
        "created": "2023-01-07 02:14:01 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:14:01 AM",
        "ended": "2023-01-07 02:14:21 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-8",
        "created": "2023-01-07 02:13:47 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:13:47 AM",
        "ended": "2023-01-07 02:14:42 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-7",
        "created": "2023-01-07 02:10:34 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:10:34 AM",
        "ended": "2023-01-07 02:10:53 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-4",
        "created": "2023-01-07 02:10:22 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:10:22 AM",
        "ended": "2023-01-07 02:11:06 AM",
        "language": "en-US"
      },
      {
        "name": "toxicity-job-sample-audio-1",
        "created": "2023-01-07 02:09:30 AM",
        "status": "COMPLETED",
        "started": "2023-01-07 02:09:30 AM",
        "ended": "2023-01-07 02:10:49 AM",
        "language": "en-US"
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
      {showDetail?<JobDetail job={selectedItems[0].name} onBack={handleBackToList} />:
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