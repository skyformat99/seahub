import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { gettext } from '../../../utils/constants';
import { Utils } from '../../../utils/utils';

const propTypes = {
  repo: PropTypes.object.isRequired,
  onFreezedItem: PropTypes.func.isRequired,
  onUnfreezedItem: PropTypes.func.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
};

class RepoOpMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isItemMenuShow: false
    };
  }

  onMenuItemClick = (e) => {
    let operation = Utils.getEventData(e, 'op');
    this.props.onMenuItemClick(operation);
  }

  onDropdownToggleClick = (e) => {
    this.toggleOperationMenu(e);
  }

  toggleOperationMenu = (e) => {
    this.setState(
      {isItemMenuShow: !this.state.isItemMenuShow},
      () => {
        if (this.state.isItemMenuShow) {
          this.props.onFreezedItem();
        } else {
          this.props.onUnfreezedItem();
        }
      }
    );
  }

  translateOperations = (item) => {
    let translateResult = '';
    switch(item) {
      case 'Share':
        translateResult = gettext('Share');
        break;
      case 'Delete':
        translateResult = gettext('Delete');
        break;
      case 'Transfer':
        translateResult = gettext('Transfer');
        break;
      case 'History Setting':
        translateResult = gettext('History Setting');
        break;
      default:
        break;
    }

    return translateResult;
  }

  render() {
    const repo = this.props.repo;
    let operations = ['Delete', 'Transfer'];
    if (!repo.encrypted) {
      operations.push('Share');
    }
    operations.push('History Setting');

    return (
      <Dropdown isOpen={this.state.isItemMenuShow} toggle={this.toggleOperationMenu}>
        <DropdownToggle 
          tag="i"
          className="sf-dropdown-toggle fa fa-ellipsis-v"
          title={gettext('More Operations')}
          data-toggle="dropdown" 
          aria-expanded={this.state.isItemMenuShow}
        />
        <DropdownMenu className="mt-2 mr-2">
          {operations.map((item, index )=> {
            return (<DropdownItem key={index} data-op={item} onClick={this.onMenuItemClick}>{this.translateOperations(item)}</DropdownItem>);
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

RepoOpMenu.propTypes = propTypes;

export default RepoOpMenu;
