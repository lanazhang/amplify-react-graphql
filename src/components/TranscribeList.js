import { useState } from "react";
import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import TextFilter from "@cloudscape-design/components/text-filter";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";

export default () => {
  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([{ name: "Item 2" }]);
    return (
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
      columnDefinitions={[
        {
          id: "variable",
          header: "Job name",
          cell: e => e.name,
          sortingField: "name"
        },
        { id: "type", header: "Status", cell: e => e.type },
        {
          id: "description",
          header: "Created",
          cell: e => e.description
        }
      ]}
      items={[
        {
          name: "Item 1",
          alt: "First",
          description: "This is the first item",
          type: "1A",
          size: "Small"
        },
        {
          name: "Item 2",
          alt: "Second",
          description: "This is the second item",
          type: "1B",
          size: "Large"
        },
        {
          name: "Item 3",
          alt: "Third",
          description: "-",
          type: "1A",
          size: "Large"
        },
        {
          name: "Item 4",
          alt: "Fourth",
          description: "This is the fourth item",
          type: "2A",
          size: "Small"
        },
        {
          name: "Item 5",
          alt: "-",
          description:
            "This is the fifth item with a longer description",
          type: "2A",
          size: "Large"
        },
        {
          name: "Item 6",
          alt: "Sixth",
          description: "This is the sixth item",
          type: "1A",
          size: "Small"
        }
      ]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      visibleColumns={[
        "variable",
        "value",
        "type",
        "description"
      ]}
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
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/10)"
              : "(10)"
          }
        >
          Transcription jobs
        </Header>
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
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            visibleContent: [
              "variable",
              "value",
              "type",
              "description"
            ]
          }}
          pageSizePreference={{
            title: "Select page size",
            options: [
              { value: 10, label: "10 resources" },
              { value: 20, label: "20 resources" }
            ]
          }}
          visibleContentPreference={{
            title: "Select visible content",
            options: [
              {
                label: "Main distribution properties",
                options: [
                  {
                    id: "variable",
                    label: "Variable name",
                    editable: false
                  },
                  { id: "value", label: "Text value" },
                  { id: "type", label: "Type" },
                  {
                    id: "description",
                    label: "Description"
                  }
                ]
              }
            ]
          }}
        />
      }
    />
    
  );
}