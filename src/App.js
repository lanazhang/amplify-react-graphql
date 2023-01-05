import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Link from "@cloudscape-design/components/link";
import Alert from "@cloudscape-design/components/alert";
import TranscribeList from "./components/TranscribeList";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const App = ({ signOut }) => {
      return (
    <ContentLayout
      header={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            info={<Link>Info</Link>}
            description="AWS AI Content Moderation demo - Transcribe Toxicity Classification."
            actions={
              <Button variant="primary" onClick={signOut}>Sign Out</Button>
            }
          >
            AWS Content Modertion Demo
          </Header>

          <Alert>This is a generic alert.</Alert>
        </SpaceBetween>
      }
    >
      <Container>
       < TranscribeList />
      </Container>
    </ContentLayout>
    
  );
}
export default withAuthenticator(App);
