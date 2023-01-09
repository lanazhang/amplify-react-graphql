import { useState, useEffect } from "react";
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

export default (onItemClick) => {
  const AUDIO_SERVICE_URL = process.env.REACT_APP_AUDIO_SERVICE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [items, setItems] = useState([]);

  const [selectedItems, setSelectedItems ] = useState([]);
  const [loadedFlag, setLoadedFlag ] = useState(false);
  const [preferences, setPreferences] = useLocalStorage('React-DistributionsTable-Preferences', DEFAULT_PREFERENCES);
  const [columnDefinitions, saveWidths] = useColumnWidths('React-Table-Widths', COLUMN_DEFINITIONS);

  const [showCreate, setShowCreate] = useState(false); 
  const [showDetail, setShowDetail] = useState(false); 

  useEffect(() => {
    if (items.length === 0 && !loadedFlag) {
      fetch(AUDIO_SERVICE_URL + 'jobs', {
        method: 'POST',
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
           'x-api-key': API_KEY
        },
        })
        .then((response) => response.json())
        .then((data) => {
            var resp = JSON.parse(data.body)
            setItems(resp);
            setLoadedFlag(true);
        })
        .catch((err) => {
          setLoadedFlag(true);
          console.log(err.message);
        });

    }
  })

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
      {showCreate?<JobCreate jobNames={items.map(i=>i.name)} onDismiss={handleCloseCreate}/>:<div/>}
      {showDetail?<JobDetail jobName={selectedItems[0].name} onBack={handleBackToList} />:
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