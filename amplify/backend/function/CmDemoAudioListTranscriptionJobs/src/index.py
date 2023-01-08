import json
import boto3
from datetime import datetime

JOB_PREFIX = "toxicity-job-"
transcribe = boto3.client("transcribe")

def handler(event, context):
    result = []
    response = transcribe.list_transcription_jobs(JobNameContains=JOB_PREFIX)
    result += format_jobs(response["TranscriptionJobSummaries"])
    while "NextToken" in response and len(response["NextToken"]) > 0:
        response = transcribe.list_transcription_jobs(JobNameContains=JOB_PREFIX, NextToken=response["NextToken"])
        result += format_jobs(response["TranscriptionJobSummaries"])
    
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }

def format_jobs(jobs):
    result = []
    for j in jobs:
        result.append(
            {
                "name": j["TranscriptionJobName"],
                "created": j["CreationTime"].strftime("%Y-%m-%d %H:%M:%S %p"),
                "status": j["TranscriptionJobStatus"],
                "started": j["StartTime"].strftime("%Y-%m-%d %H:%M:%S %p"),
                "ended": j["CompletionTime"].strftime("%Y-%m-%d %H:%M:%S %p"),
                "language": j["LanguageCode"]
            }
            )
    return result