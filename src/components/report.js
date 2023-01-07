import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
} from '@cloudscape-design/components';
import { CounterLink } from './commons/common-components';
import BarChart from "@cloudscape-design/components/bar-chart";
import PieChart from "@cloudscape-design/components/pie-chart";

export default () => {
   const [report, setReport] = useState(
    {
      "summary": {
        "total_audio": 3484,
        "toxic_audio": 251,
        "avg_confidence": 0.8734,
      },
      "top_categories": {
        "PROFANITY": 123,
        "HATE_SPEECH": 76,
        "SEXUAL": 20,
        "INSULT": 18,
        "VIOLENCE_OR_THREAT": 9,
        "GRAPHIC": 3,
        "HARASSMENT_OR_ABUSE": 2,
      },
      "top_categries_pie": 
        [
          {
            "title":"PROFANITY",
            "value":123
          },
          {
            "title":"HATE_SPEECH",
            "value":76
          },
          {
            "title":"SEXUAL",
            "value":20
          },
          {
            "title":"INSULT",
            "value":18
          },
          {
            "title":"VIOLENCE_OR_THREAT",
            "value":9
          },
          {
            "title":"GRAPHIC",
            "value":3
          },
          {
            "title":"HARASSMENT_OR_ABUSE",
            "value":2
          },
        ]
      
    }
   );

   const Summary = () => (
    <ColumnLayout columns={4} variant="text-grid">
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Total #s of audios</Box>
          <CounterLink>{report.summary.total_audio.toLocaleString('en-US')}</CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Toxic audios</Box>
          <CounterLink>{report.summary.toxic_audio.toLocaleString('en-US')}</CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Toxicity Ratio</Box>
          <CounterLink>
          {Number(report.summary.toxic_audio/report.summary.total_audio).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})}
          </CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Average confidence score</Box>
          <CounterLink>{Number(report.summary.avg_confidence).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</CounterLink>
      </SpaceBetween>
    </ColumnLayout>
  );

  const TopCategories = () => (
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <PieChart
        hideFilter={false}
        data={report.top_categries_pie}
        detailPopoverContent={(datum, sum) => [
          { key: "Resource count", value: datum.value },
          {
            key: "Percentage",
            value: `${((datum.value / sum) * 100).toFixed(
              0
            )}%`
          },
          { key: "Last update on", value: datum.lastUpdate }
        ]}
        segmentDescription={(datum, sum) =>
          `${datum.value} units, ${(
            (datum.value / sum) *
            100
          ).toFixed(0)}%`
        }
        i18nStrings={{
          detailsValue: "Value",
          detailsPercentage: "Percentage",
          filterLabel: "Filter displayed data",
          filterPlaceholder: "Filter data",
          filterSelectedAriaLabel: "selected",
          detailPopoverDismissAriaLabel: "Dismiss",
          legendAriaLabel: "Legend",
          chartAriaRoleDescription: "pie chart",
          segmentAriaRoleDescription: "segment"
        }}
        ariaDescription="Pie chart showing how many audio are currently in which toxicity category."
        ariaLabel="Pie chart"
        errorText="Error loading data."
        loadingText="Loading chart"
        recoveryText="Retry"
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
      </SpaceBetween>
    </ColumnLayout>
  );

  const TopGamers = () => (
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <BarChart
          hideFilter={true}
          hideLegend={true}
          height={300}
          series={[
            {
              title: "Confidence score",
              type: "bar",
              data: [
                { x: "PROFANITY", y: report.top_categories.PROFANITY },
                { x: "HATE_SPEECH", y: report.top_categories.HATE_SPEECH },
                { x: "SEXUAL", y: report.top_categories.SEXUAL },
                { x: "INSULT", y: report.top_categories.INSULT },
                { x: "VIOLENCE_OR_THREAT", y: report.top_categories.VIOLENCE_OR_THREAT },
                { x: "GRAPHIC", y: report.top_categories.GRAPHIC },
                { x: "HARASSMENT_OR_ABUSE", y: report.top_categories.HARASSMENT_OR_ABUSE },
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
          yDomain={[0, 150]}
          i18nStrings={{
            detailPopoverDismissAriaLabel: "Dismiss",
            legendAriaLabel: "Legend",
            chartAriaRoleDescription: "line chart",
            yTickFormatter: function o(e) {
              return e;
            }
          }}
          ariaLabel="Single data series line chart"
          errorText="Error loading data."
          loadingText="Loading chart"
          recoveryText="Retry"
          xScaleType="categorical"
          xTitle="Toxicity category"
          yTitle="#s of audios"
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
      </SpaceBetween>
    </ColumnLayout>
  );

    return (
      <div>
        <br/>
        <Container
          header={
            <div>
            <Header
              variant="h2"
              info={''}
              description={'Transcribe toxicity analysis overviee'}>
              Analysis overview
            </Header>
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
              </SpaceBetween>
            </Box> 
            </div>
          }>
          <Summary />
        </Container>
        <br />
        <Container
          header={
            <Header
              variant="h2">
              Top toxicity categories
            </Header>
          }>
          <SpaceBetween size="l">
            <TopCategories />
          </SpaceBetween>
        </Container>
        <br />
        <Container
          header={
            <Header
              variant="h2">
              Top 10 toxic gamers
            </Header>
          }>
          <SpaceBetween size="l">
            <TopGamers />
          </SpaceBetween>
        </Container>
      </div>
    );
}