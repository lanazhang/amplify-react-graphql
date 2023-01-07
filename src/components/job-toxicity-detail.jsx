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
import BarChart from "@cloudscape-design/components/bar-chart";
import audio from '../static/sample_audio_01.wav'

function JobToxicityDetail ({segment, onDismiss}) {

    return (<Modal
      visible={true}
      onDismiss={onDismiss}
      header="Segment detail"
      closeAriaLabel="Close dialog">
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <Box variant="awsui-key-label">Time range: {segment.start_time + " - " + segment.end_time + " s"}</Box>
      </SpaceBetween>  
      <SpaceBetween size="l">
        <Box variant="awsui-key-label">Overall toxicity confidence score</Box>
        <Box variant="awsui-value-large">{Number(segment.toxicity).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</Box>
      </SpaceBetween>  
      <SpaceBetween size="l">
        <Box variant="awsui-key-label">Transcribed text</Box>
        <Box variant="div">{segment.text}</Box>
      </SpaceBetween>  
      <SpaceBetween size="l">
        <Box variant="awsui-key-label">Play the audio segment</Box>
        <Box variant="div">
          <audio controls currentTime={segment.start_time}>
            <source src={audio} type="audio/wav" />
          Your browser does not support the audio element.
          </audio>
        </Box>
      </SpaceBetween>
      {segment.toxicity >= 0.5?
      <SpaceBetween size="l">
        <BarChart
          hideFilter={true}
          hideLegend={true}
          height="300"
          series={[
            {
              title: "Confidence score",
              type: "bar",
              data: [
                { x: "PROFANITY", y: segment.categories.PROFANITY },
                { x: "HATE_SPEECH", y: segment.categories.HATE_SPEECH },
                { x: "SEXUAL", y: segment.categories.SEXUAL },
                { x: "INSULT", y: segment.categories.INSULT },
                { x: "VIOLENCE_OR_THREAT", y: segment.categories.VIOLENCE_OR_THREAT },
                { x: "GRAPHIC", y: segment.categories.GRAPHIC },
                { x: "HARASSMENT_OR_ABUSE", y: segment.categories.HARASSMENT_OR_ABUSE },
              ],
              valueFormatter: e => Number(e).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
            }
          ]}
          xDomain={[
            "PROFANITY",
            "HATE_SPEECH",
            "SEXUAL",
            "INSULT",
            "VIOLENCE_OR_THREAT",
            "GRAPHIC",
            "HARASSMENT_OR_ABUSE",
          ]}
          yDomain={[0, 1]}
          i18nStrings={{
            detailPopoverDismissAriaLabel: "Dismiss",
            legendAriaLabel: "Legend",
            chartAriaRoleDescription: "line chart",
            yTickFormatter: function o(e) {
              return e * 100 + "%";
            }
          }}
          ariaLabel="Single data series line chart"
          errorText="Error loading data."
          loadingText="Loading chart"
          recoveryText="Retry"
          xScaleType="categorical"
          xTitle="Toxicity category"
          yTitle="Confidence score by toxicity category"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data available</b>
              <Box variant="p" color="inherit">
                There is no data available
              </Box>
            </Box>
          }
          noMatch={
            <Box textAlign="center" color="inherit">
              <b>No matching data</b>
              <Box variant="p" color="inherit">
                There is no matching data to display
              </Box>
              <Button>Clear filter</Button>
            </Box>
          }
        />
      </SpaceBetween>:<div/>}
    </ColumnLayout>
    </Modal>
  );
}

export {JobToxicityDetail};