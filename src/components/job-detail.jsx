import React, { useState } from 'react';
import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
  Link,
  Pagination,
  Toggle
} from '@cloudscape-design/components';
import Cards from "@cloudscape-design/components/cards";
import { JobToxicityDetail } from './job-toxicity-detail';
import Badge from "@cloudscape-design/components/badge";

function getAvgToxicityConfidence(array) {
  var total = 0;
  var count = 0;
  var toxicity_count = 0
  array.forEach(function(i, idx) {
      if (i.toxicity >= 0.5) {
        total += i.toxicity;
        toxicity_count++;
      }
      count++;
    }
  )
  var avg = 0
  if (toxicity_count > 0) {
    avg = total/toxicity_count;
  }
  return {"average_confidence_score": avg, "total_count": count, "toxicity_count": toxicity_count}
}

function getToxicSegments(job_full) {
  var j = Object.assign({}, job_full);
  j.toxicity = job_full.toxicity.filter(t=> t.toxicity >= 0.5);  
  return j;
}

function JobDetail ({jobName, onBack}) {
  const job_full = {
    "name": "toxicity-job-sample-audio-15",
    "status": "COMPLETED",
    "created": "2023-01-07 02:14:55 AM",
    "language": "en-US",
    "started": "2023-01-07 02:14:55 AM",
    "ended": "2023-01-07 02:15:17 AM",
    "avg_toxicity_score": null,
    "format": "wav",
    "rate": "16000 Hz",
    "input_s3_uri": "s3://sagemaker-us-east-1-122702569249/content-moderation-im/audio-moderation/sample_audio_15.wav/",
    "input_s3_pre_signed_url": "../static/sample_audio_15.wav",
    "output_s3_uri": "https://s3.us-east-1.amazonaws.com/sagemaker-us-east-1-122702569249/content-moderation-im/audio-moderation/output/toxicity-job-sample-audio-15.json",
    "output_s3_pre_signed_url": "",
    "toxicity": [
      {
        "text": "man. I know about you but fucking burgers that are the most over a piece of fucking burgers I've ever tasted. That shit is fucking whack. They don't even make I think they made with like or horse assholes or something like there's no way that's made with real fucking meat and I'm fucking made by christian white people because it's owned by the white people because you, let alone let anyone of color trial into this shit. I fucking hate it man, fucking racist ass.",
        "toxicity": 0.9358,
        "categories": {
          "PROFANITY": 0.9965,
          "HATE_SPEECH": 0.7823,
          "SEXUAL": 0.0134,
          "INSULT": 0.6016,
          "VIOLENCE_OR_THREAT": 0.0038,
          "GRAPHIC": 0.0081,
          "HARASSMENT_OR_ABUSE": 0.0215
        },
        "start_time": 28.889,
        "end_time": 53.06
      },
      {
        "text": "Mhm",
        "toxicity": 0.0377,
        "categories": {
          "PROFANITY": 0.0472,
          "HATE_SPEECH": 0.0211,
          "SEXUAL": 0.0013,
          "INSULT": 0.0079,
          "VIOLENCE_OR_THREAT": 0.0013,
          "GRAPHIC": 0.0011,
          "HARASSMENT_OR_ABUSE": 0.0012
        },
        "start_time": 53.68,
        "end_time": 54.09
      },
      {
        "text": "and so I guess so. Very better get some Beverly hills because I want that fresh white meat chopped up and dined AAA",
        "toxicity": 0.247,
        "categories": {
          "PROFANITY": 0.0245,
          "HATE_SPEECH": 0.0396,
          "SEXUAL": 0.0065,
          "INSULT": 0.0029,
          "VIOLENCE_OR_THREAT": 0.0355,
          "GRAPHIC": 0.0445,
          "HARASSMENT_OR_ABUSE": 0.0042
        },
        "start_time": 73.58,
        "end_time": 80.18
      },
      {
        "text": "keto. That's all I eat keto. What's in the keto Just",
        "toxicity": 0.0584,
        "categories": {
          "PROFANITY": 0.0334,
          "HATE_SPEECH": 0.0368,
          "SEXUAL": 0.0017,
          "INSULT": 0.0117,
          "VIOLENCE_OR_THREAT": 0.0021,
          "GRAPHIC": 0.0016,
          "HARASSMENT_OR_ABUSE": 0.0014
        },
        "start_time": 84.389,
        "end_time": 88.58
      },
      {
        "text": "man. They white people create so much fucking shit. They they just been making up new diets on nothing. Don't even exist anymore. Like oh we're gonna create a keto, we're gonna now we're gluten free. Like who the fuck? Who the fuck is gluten? Who has a glute diet, fucking allergy fucking pussy asses. That's why you see no fucking melton because you know white people don't have any fucking spicy. I all think mayonnaise is fucking spicy, fucking hockey",
        "toxicity": 0.9671,
        "categories": {
          "PROFANITY": 0.9938,
          "HATE_SPEECH": 0.9064,
          "SEXUAL": 0.0134,
          "INSULT": 0.6608,
          "VIOLENCE_OR_THREAT": 0.0033,
          "GRAPHIC": 0.0065,
          "HARASSMENT_OR_ABUSE": 0.0175
        },
        "start_time": 91.069,
        "end_time": 111.139
      },
      {
        "text": "Get a score of 2500 man. Black people get get a score of credit of even 200 ft",
        "toxicity": 0.3911,
        "categories": {
          "PROFANITY": 0.1118,
          "HATE_SPEECH": 0.284,
          "SEXUAL": 0.0023,
          "INSULT": 0.0917,
          "VIOLENCE_OR_THREAT": 0.0011,
          "GRAPHIC": 0.0009,
          "HARASSMENT_OR_ABUSE": 0.0028
        },
        "start_time": 120.94,
        "end_time": 125.919
      },
      {
        "text": "Let's see what is this fucking D. D. R. Fucking oh jesus. Hell no it's some gang simple bullshit. This is so so retarded man. Who the fuck makes these goddamn games? I'd have been like skipping this fucking game up so hard. I'm like ma I am playing this, I'm gonna I'm gonna play something less gay like Pokemon at this point. What is this? This is a boot the the D. D. R. Uh data center revolution bootleg version compton.",
        "toxicity": 0.77,
        "categories": {
          "PROFANITY": 0.9945,
          "HATE_SPEECH": 0.214,
          "SEXUAL": 0.0062,
          "INSULT": 0.522,
          "VIOLENCE_OR_THREAT": 0.0008,
          "GRAPHIC": 0.002,
          "HARASSMENT_OR_ABUSE": 0.0105
        },
        "start_time": 135.3,
        "end_time": 160.059
      },
      {
        "text": "and the barbie gear. That's what they're against. I don't know what the girl in the back on the left is killing it though, so I don't know this",
        "toxicity": 0.0888,
        "categories": {
          "PROFANITY": 0.0843,
          "HATE_SPEECH": 0.0227,
          "SEXUAL": 0.0086,
          "INSULT": 0.0208,
          "VIOLENCE_OR_THREAT": 0.0011,
          "GRAPHIC": 0.0016,
          "HARASSMENT_OR_ABUSE": 0.0031
        },
        "start_time": 163.3,
        "end_time": 168.94
      },
      {
        "text": "she got man, she got fucking dollar bills popping out of her pussy right now. That's how that works.",
        "toxicity": 0.9783,
        "categories": {
          "PROFANITY": 0.9939,
          "HATE_SPEECH": 0.0491,
          "SEXUAL": 0.9072,
          "INSULT": 0.3673,
          "VIOLENCE_OR_THREAT": 0.0129,
          "GRAPHIC": 0.1582,
          "HARASSMENT_OR_ABUSE": 0.106
        },
        "start_time": 170.649,
        "end_time": 175.85
      }
    ]
  };

  const [avgToxicity, setAvgToxicity] = useState(getAvgToxicityConfidence(job_full.toxicity));
  const [job, setJob] = useState(getToxicSegments(job_full))

  const [selectedItem, setSelectedItem] = useState(undefined);
  const [toxicityToggleChecked, setToxicityToggleChecked] = useState(true);

  const handleDismiss = e => {
    setSelectedItem(undefined);
  }

  function handleToxicityToggleChecked(checked) {
    setToxicityToggleChecked(checked);
    if(checked)
    {
      var j = getToxicSegments(job_full);
      setJob(j);
    }
    else
    {
      setJob(job_full);
    }
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
          <StatusIndicator type={job.status === 'COMPLETED' ? 'success' : job.status === 'FAILED'?'error':'info'}>
            {job.status}
          </StatusIndicator>  
        </div>
      </SpaceBetween>
  
      <SpaceBetween size="l">
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
          <div>
            <Link external
              externalIconAriaLabel="Download the transcrip JSON file" 
              href={job.output_s3_pre_signed_url}>
              {job.output_s3_uri}
            </Link>
          </div>
        </div>
      </SpaceBetween>
    </ColumnLayout>
  );
  const ToxicitySummary = () => (
    
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.start_time}`,
          selectionGroupLabel: "Item selection"
        }}
        cardDefinition={{
          header: e => <Link onFollow={({ detail }) =>
              {
                setSelectedItem(job.toxicity.find(t=>t.start_time===e.start_time));
              }
            }>{e.start_time + ' - ' + e.end_time + ' s'}</Link>,
          sections: [
            {
              id: "confidence",
              header: "Toxicity confidence score",
              content: e => (
                <Badge color={e.toxicity>=0.5?'red':'green'}>{Number(e.toxicity).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</Badge>
              )
            },
            {
              id: "text",
              header: "Transcribed text",
              content: e => e.text.length > 50 ? e.text.substr(1,50) + '...':e.text
            },

          ]
        }}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 3 }
        ]}
        items={job.toxicity}
        loadingText="Loading resources"
        trackBy="start_time"
        visibleSections={["text", "confidence"]}
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
            <Box>
                <Toggle
                  onChange={({ detail }) =>
                    handleToxicityToggleChecked(detail.checked)
                  }
                  checked={toxicityToggleChecked}
                >
                  Only show toxic segments
                </Toggle>
            </Box>
          }
          >
            Audio segments
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
        <br/>
        <Container
          header={
            <div>
            <Header
              variant="h2"
              info={''}>
              Play the audio
            </Header>
            </div>
          }>
          <audio controls>
            <source src={job.input_s3_pre_signed_url} type="audio/wav"/>
          </audio>
        </Container>
        {job.toxicity !== undefined && job.toxicity.length > 0? 
        <div>
        <br/>
        <Container
          header={
            <Header
              variant="h2">
              Toxicity detection
            </Header>
          }>
          <Box variant="awsui-key-label">Average toxicity confidence (for segments with toxicity confidence score >= 50%)</Box>
          <Box variant="samp">{avgToxicity.toxicity_count} / {avgToxicity.total_count} segments are toxic</Box><br/>
          <Box variant="awsui-value-large">{Number(avgToxicity.average_confidence_score).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</Box>
          {
            avgToxicity.average_confidence_score>=0.5?<Badge color='red'>Toxic</Badge>:<Badge color='green'>Nontoxic</Badge>
          }
          <br/><br/>
          <ToxicitySummary />
        </Container>
        <br />
        {selectedItem !== undefined?
        <Container
          header={
            <Header
              variant="h2">
              Toxicity analysis
            </Header>
          }>
          <JobToxicityDetail segment={selectedItem} inputUrl={job.input_s3_pre_signed_url} onDismiss={handleDismiss}/>
        </Container>:<div/>}
        </div>
        : <div/>}
      </div>
    );
}

export {JobDetail};