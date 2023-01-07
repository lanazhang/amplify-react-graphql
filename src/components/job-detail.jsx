import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
  TextFilter,
  Pagination,
  CollectionPreferences
} from '@cloudscape-design/components';
import Cards from "@cloudscape-design/components/cards";
import { JobToxicityDetail } from './job-toxicity-detail';
import Badge from "@cloudscape-design/components/badge";

function JobDetail ({job, onBack}) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [showDetail, setShowDetail] = useState(false); 

  const handleViewDetail = e => {
    setShowDetail(true);
  }
  const handleDismiss = e => {
    setShowDetail(false);
  }
   const JobDetails = () => (
    <ColumnLayout columns={3} variant="text-grid">
      <SpaceBetween size="l">
        <div>
          <Box variant="awsui-key-label">Job name</Box>
          <div>{job.name}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Language</Box>
          <div>{job.language}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Created</Box>
          <div>{job.created}</div>
        </div>        
        <div>
          <Box variant="awsui-key-label">Expiration</Box>
          <div>{job.expiration}</div>
        </div>
      </SpaceBetween>
  
      <SpaceBetween size="l">
          <StatusIndicator type={job.status === 'Completed' ? 'success' : job.status === 'Failed'?'error':'info'}>
            {job.status}
          </StatusIndicator>  
        <div>
          <Box variant="awsui-key-label">Started</Box>
          <div>{job.started}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Ended</Box>
          <div>{job.ended}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Input file format</Box>
          <div>{job.format}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Audio sampling rate</Box>
          <div>{job.rate}</div>
        </div>
      </SpaceBetween>
      <SpaceBetween size="l">
        <div>
          <Box variant="awsui-key-label">Input data location</Box>
          <div>{job.input_s3_uri}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Output data location</Box>
          <div>{job.output_s3_uri}</div>
        </div>
      </SpaceBetween>
    </ColumnLayout>
  );
  const ToxicitySummary = () => (
    
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <Cards
        selectionType="single"
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.time_range}`,
          selectionGroupLabel: "Item selection"
        }}
        cardDefinition={{
          header: e => e.start_time + ' - ' + e.end_time + ' s',
          sections: [
            {
              id: "text",
              header: "Transcribed text",
              content: e => e.text.length > 50 ? e.text.substr(1,50) + '...':e.text
            },
            {
              id: "confidence",
              header: "Toxicity Confidence",
              content: e => (
                Number(e.toxicity).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
              )
            }
          ]
        }}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 3 }
        ]}
        items={[
          {
            "index": 1,
            "text": "Mhm.",
            "toxicity": 0.0122,
            "categories": {
              "PROFANITY": 0.0183,
              "HATE_SPEECH": 0.0011,
              "SEXUAL": 0.0012,
              "INSULT": 0.0058,
              "VIOLENCE_OR_THREAT": 0.0004,
              "GRAPHIC": 0.0003,
              "HARASSMENT_OR_ABUSE": 0.001
            },
            "start_time": 71.54,
            "end_time": 72.139
          },
          {
            "index": 2,
            "text": "Yeah, I guess he thinks he's funny. All right.",
            "toxicity": 0.0152,
            "categories": {
              "PROFANITY": 0.0078,
              "HATE_SPEECH": 0.001,
              "SEXUAL": 0.0011,
              "INSULT": 0.0101,
              "VIOLENCE_OR_THREAT": 0.0002,
              "GRAPHIC": 0.0002,
              "HARASSMENT_OR_ABUSE": 0.0014
            },
            "start_time": 98.79,
            "end_time": 102.069
          },
          {
            "index": 3,
            "text": "Yeah, Beyonce, wow. What a lead, Huh?",
            "toxicity": 0.0061,
            "categories": {
              "PROFANITY": 0.0043,
              "HATE_SPEECH": 0.0005,
              "SEXUAL": 0.0006,
              "INSULT": 0.0038,
              "VIOLENCE_OR_THREAT": 0.0002,
              "GRAPHIC": 0.0002,
              "HARASSMENT_OR_ABUSE": 0.0011
            },
            "start_time": 116.98,
            "end_time": 120
          },
          {
            "index": 4,
            "text": "uh Oh no, no.",
            "toxicity": 0.0063,
            "categories": {
              "PROFANITY": 0.0081,
              "HATE_SPEECH": 0.0007,
              "SEXUAL": 0.0008,
              "INSULT": 0.0038,
              "VIOLENCE_OR_THREAT": 0.0002,
              "GRAPHIC": 0.0002,
              "HARASSMENT_OR_ABUSE": 0.0006
            },
            "start_time": 128.669,
            "end_time": 132.77
          },
          {
            "index": 5,
            "text": "Oh, man.",
            "toxicity": 0.0099,
            "categories": {
              "PROFANITY": 0.0118,
              "HATE_SPEECH": 0.0009,
              "SEXUAL": 0.0011,
              "INSULT": 0.0067,
              "VIOLENCE_OR_THREAT": 0.0003,
              "GRAPHIC": 0.0003,
              "HARASSMENT_OR_ABUSE": 0.0009
            },
            "start_time": 134.529,
            "end_time": 136.16
          },
          {
            "index": 6,
            "text": "Yeah. Too much uh makeup.",
            "toxicity": 0.0331,
            "categories": {
              "PROFANITY": 0.011,
              "HATE_SPEECH": 0.0025,
              "SEXUAL": 0.0018,
              "INSULT": 0.0251,
              "VIOLENCE_OR_THREAT": 0.0004,
              "GRAPHIC": 0.0003,
              "HARASSMENT_OR_ABUSE": 0.0018
            },
            "start_time": 141.619,
            "end_time": 143.639
          },
          {
            "index": 7,
            "text": "or uh you know that facial surgery? These guys are idiots.",
            "toxicity": 0.7652,
            "categories": {
              "PROFANITY": 0.0872,
              "HATE_SPEECH": 0.0341,
              "SEXUAL": 0.0047,
              "INSULT": 0.7352,
              "VIOLENCE_OR_THREAT": 0.0011,
              "GRAPHIC": 0.0009,
              "HARASSMENT_OR_ABUSE": 0.0172
            },
            "start_time": 145.229,
            "end_time": 149.229
          }
        ]}
        loadingText="Loading resources"
        trackBy="index"
        visibleSections={["text", "time_range", "confidence"]}
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
        header={
          <Header
          actions={
            <Button onClick={handleViewDetail} disabled={selectedItems.length === 0} >View details</Button> 
          }
          >
            Audio Segments
          </Header>
        }
        pagination={
          <Pagination currentPageIndex={1} pagesCount={2} />
        }
      />
      </SpaceBetween>
    </ColumnLayout>
  )

    return (
      <div>
        <Container
          header={
            <div>
            <Header
              variant="h2"
              info={''}>
              Job detail
            </Header>
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="normal" onClick={onBack}>
                  Back to list
                </Button>
              </SpaceBetween>
            </Box> 
            </div>
          }>
          <JobDetails />
        </Container>
        {job.toxicity !== undefined && job.toxicity.toxicityDetection !== undefined && job.toxicity.toxicityDetection.length > 0? 
        <div>
        <br/>
        <Container
          header={
            <Header
              variant="h2">
              Toxicity analysis
            </Header>
          }>
          <ToxicitySummary />
        </Container>
        <br />
        {showDetail?
        <Container
          header={
            <Header
              variant="h2">
              Toxicity analysis
            </Header>
          }>
          <JobToxicityDetail segment={selectedItems[0]} onDismiss={handleDismiss}/>
        </Container>:<div/>}
        </div>
        : <div/>}
      </div>
    );
}

export {JobDetail};