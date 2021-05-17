
import React, { Component } from "react";
import {
  Tabs,
  TabList,
  Tab,
  DragTabList,
  DragTab,
  PanelList,
  Panel,
  ExtraButton,
} from "react-tabtab";
import { makeData } from "./utils";
import { simpleSwitch } from "react-tabtab/lib/helpers/move";
import "../Tabs/tabs.css";

export default class Tabs_component extends Component {
  constructor(props) {
    super(props);
    const tabs = makeData(3, "Tab");

    this.state = {
      tabs,
      activeIndex: 0,
      showModal: false,
    };
  }

  handleExtraButton = () => {
    const { tabs } = this.state;
    const newTabs = [
      ...tabs,
      { title: "New Tab", content: "New Content" },
    ].slice(0, 9);

    this.setState({
      tabs: newTabs,
      activeIndex: newTabs.length - 1,
    });
  };

  handleTabChange = (index) => {
    this.setState({ activeIndex: index });
  };

  handleEdit = ({ type, index }) => {
    this.setState((state) => {
      let { tabs, activeIndex } = state;
      if (type === "delete") {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return { tabs, activeIndex };
    });
  };

  handleTabSequenceChange = ({ oldIndex, newIndex }) => {
    const { tabs } = this.state;
    const updateTabs = simpleSwitch(tabs, oldIndex, newIndex);
    this.setState({ tabs: updateTabs, activeIndex: newIndex });
  };

  render() {
    const { tabs, activeIndex, showModal } = this.state;
    const tabTemplate = [];
    const panelTemplate = [];

    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(
        <DragTab key={i} closable={closable}>
          {tab.title}
        </DragTab>
      );
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    });

    return (
      <div className="wrapper">
        <h1 style={{fontSize:'20px', display:'flex'}}>Demo container</h1>
        <Tabs
          onTabEdit={this.handleEdit}
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          onTabSequenceChange={this.handleTabSequenceChange}
          showModalButton={showModal}
          customStyle={this.props.customStyle}
          ExtraButton={
            <ExtraButton onClick={this.handleExtraButton}>+</ExtraButton>
          }
        >
          <DragTabList>{tabTemplate}</DragTabList>
          <PanelList>{panelTemplate}</PanelList>
        </Tabs>
      </div>
    );
  }
}
