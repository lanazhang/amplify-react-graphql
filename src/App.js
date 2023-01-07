import { useState, useRef } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import * as React from "react";
import Link from "@cloudscape-design/components/link";
import Alert from "@cloudscape-design/components/alert";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {Navigation,ec2NavItems, Notifications} from './components/commons/common-components';
import { AppLayout } from '@cloudscape-design/components';
import { EC2ToolsContent, Breadcrumbs } from './components/common-components';
import JobList from "./components/job-list";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import logo from './static/aws_logo.png'

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
      <div>
      <TopNavigation
      identity={{
        href: "#",
        title: "AWS Content Moderation Demo",
        logo: {
          src: logo,
          alt: "AWS"
        }
      }}
      utilities={[
        {
          type: "menu-dropdown",
          text: "Customer Name",
          description: "email@example.com",
          iconName: "user-profile",
          items: [
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
      <AppLayout
      headerSelector="#header"
      ref={appLayout}
      contentType="table"
      navigation={<Navigation items={ec2NavItems} activeHref="#/jobs" />}
      breadcrumbs={<Breadcrumbs />}
      tools={<EC2ToolsContent />}
      header={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            info={<Link>Info</Link>}
            description="AWS AI Content Moderation demo - Transcribe Toxicity Classification."
          >
            AWS Content Moderation Demo
          </Header>

          { alert !== null && alert.length > 0?<Alert>{alert}</Alert>:<div/>}
        </SpaceBetween>
      }
      content={< JobList onItemClick={handleItemClick} onSelectionChange={onSelectionChange}/>}
    >
    </AppLayout>
    </div>
  );
}
export default withAuthenticator(App);
