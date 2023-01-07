import { useState, useRef } from "react";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import * as React from "react";
import Link from "@cloudscape-design/components/link";
import Alert from "@cloudscape-design/components/alert";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {Navigation,ec2NavItems, Notifications} from './components/commons/common-components';
import { AppLayout } from '@cloudscape-design/components';
import { EC2ToolsContent, Breadcrumbs } from './components/common-components';
import Report from "./components/report";

const App = ({ signOut }) => {
  const [alert, setAlert] = useState("This is a generic alert");
  const appLayout = useRef();

  const [selectedItems, setSelectedItems] = useState([]); 

  const handleItemClick = event => {
    setSelectedItems([]);
  }

  const onSelectionChange = event => {
    alert(event.selectedItems);
    setSelectedItems(event.selectedItems);
  }
  
    return (
    <AppLayout
      headerSelector="#header"
      ref={appLayout}
      contentType="table"
      navigation={<Navigation items={ec2NavItems} activeHref="#/dashboard" />}
      breadcrumbs={<Breadcrumbs />}
      tools={<EC2ToolsContent />}
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
            AWS Content Moderation Demo
          </Header>

          { alert !== null && alert.length > 0?<Alert>{alert}</Alert>:<div/>}
        </SpaceBetween>
      }
      content={< Report />}
    >
    </AppLayout>
    
  );
}
export default withAuthenticator(App);
