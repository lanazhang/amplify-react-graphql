import { useState, useRef } from "react";
import Header from "@cloudscape-design/components/header";
import * as React from "react";
import Alert from "@cloudscape-design/components/alert";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {Navigation, Notifications} from './components/commons/common-components';
import { AppLayout } from '@cloudscape-design/components';
import { EC2ToolsContent, Breadcrumbs } from './components/common-components';
import JobList from "./components/job-list";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import logo from './static/aws_logo.png'
import Report from "./components/report";
import { BreadcrumbGroup, Link, SpaceBetween } from '@cloudscape-design/components';

const App = ({ signOut, user }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeNavHref, setActiveNavHref] = useState("#/dashboard");
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState([{ "type": 'label', "text": 'Home'}, {"id":"dashboard", "text": 'Dashboard', "href": '#/dashboard', }]);
  const appLayout = useRef();

  const [selectedItems, setSelectedItems] = useState([]); 

  const handleItemClick = event => {
    setSelectedItems([]);
  }

  const onSelectionChange = event => {
    setSelectedItems(event.selectedItems);
  }

  const handleHavItemClick = e => {
    setCurrentPage(e.detail.id);
    setActiveNavHref(e.detail.href);
    if (e.detail.id === "dashboard")
      setCurrentBreadcrumb([{ "type": 'label', "text": 'Home'}, {"id":"dashboard", "text": 'Dashboard', "href": '#/dashboard', }]);
    else
      setCurrentBreadcrumb([{ "type": 'label', "text": 'Home'}, {"id":"dashboard", "text": 'Transcription Jobs', "href": '#/jobs', }]);
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
          text: user.username,
          description: user.email,
          iconName: "user-profile",
          onItemClick: signOut,
          items: [
            { type: "button", id: "signout", text: "Sign out"}
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
      navigation={
      <Navigation 
        onFollowHandler={handleHavItemClick}
        selectedItems={["dasboard"]}
        activeHref={activeNavHref}
        items={
        [
          { type: 'link', id:"dashboard", text: 'Dashboard', href:"#/dashboard" },
          { type: 'link', id:"jobs", text: 'Transcription Jobs', href:"#/jobs" },
          { type: 'divider' },
          {
            type: 'link', text: 'Documentation', external: true, href: '#/documentation',
          },
        ]
      } 
      />}
      breadcrumbs={
        <BreadcrumbGroup 
          items={currentBreadcrumb}
        />
      }
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
      content={currentPage === "jobs"?< JobList onItemClick={handleItemClick} onSelectionChange={onSelectionChange}/>:< Report />}
    >
    </AppLayout>
    </div>
  );
}
export default withAuthenticator(App);
