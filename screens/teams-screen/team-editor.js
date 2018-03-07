// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import Colors from '../../constants/Colors';
import NewTeam from './new-team';
//import TeamEditorDetails from './team-editor-details';
import TeamEditorMap from './team-editor-map';
import TeamEditorMembers from './team-editor-members';

export default class TeamEditor extends Component {
    static propTypes = {
        actions: PropTypes.object,
        MyTeams: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Editor'
    };

    constructor(props) {
        super(props);
        this.state = {
            currentMessageId: null
        };
    }

    setDefault = status => {
      if (status === 'OWNER') {
        return 'TeamInvitationDetails'
      } else {
        return 'NewTeam'
      }
    }

    render() {
        const { status } = this.props.navigation.state.params || '';
        const TeamEditorNav = TabNavigator({

            TeamInvitationDetails: {
                screen: TeamEditorMembers
            },
            TeamEditorMap: {
                screen: TeamEditorMap
            },
            TeamDetails: {
                screen: NewTeam,
                header: null
            }
        }, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
            animationEnabled: true,
            swipeEnabled: false,
        tabBarOptions: {
          activeTintColor: Colors.tabIconSelected,
          inactiveTintColor: Colors.tabIconDefault,
        labelStyle: {
          fontSize: 10
        },
        style: {
          backgroundColor: Colors.tabBarBackground
        }
        },
            initialRouteName: this.setDefault(status)
        });
        return (
            <TeamEditorNav screenProps={{stacknav: this.props.navigation}}/>
        );
    }
}
