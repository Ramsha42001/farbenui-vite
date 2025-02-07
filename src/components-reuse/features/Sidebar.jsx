import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Description,
  FileCopy,
  Receipt,
  AddCircleOutline,
  Storefront,
  LiveHelp,
  Preview,
  Event,
  ChevronLeft,
  ChevronRight,
  Menu,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openData, setOpenData] = React.useState(false);
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const [openAgents, setOpenAgents] = React.useState(false);
  const [open, setOpen] = React.useState(false); 
  const [activeTab, setActiveTab] = React.useState('Overview');

  const handleClick=(tab)=>{
    setActiveTab(tab);
    const listItems = document.querySelectorAll('.MuiListItem-root');
    listItems.forEach(item => {
      if(item.textContent === tab) {
        item.style.backgroundColor = '#e0e0e0';
      } else {
        item.style.backgroundColor = 'transparent';
      }
    });
  }


  const handleClickData = () => {
    setOpenData(!openData);
  };

  const handleClickInvoice = () => {
    setOpenInvoice(!openInvoice);
  };

  const handleClickAgents = () => {
    setOpenAgents(!openAgents);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const drawerWidth = 240;
  const collapsedDrawerWidth = 80; 

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedDrawerWidth,
          boxSizing: 'border-box',
          zIndex: 10,
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        [`& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-variantPermanent`]: {
          overflowX: 'hidden',
        },
      }}
      open={open}
    >
      {/* Top Placeholder */}
      <div className="h-16" /> 
      
      <Divider />

      
      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          width: '100%',
          p: 1,
        }}
      >
        <Tooltip title={open ? 'Collapse' : 'Expand'}  sx={{ p:2 }}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? <Menu /> : <Menu />}
          </IconButton>
        </Tooltip>
      </Box>
      {/* Main List */}
      <List sx={{ flexGrow: 1 }}> {/* Added flexGrow: 1 */}
        {/* Overview */}
        <ListItem key="Overview" disablePadding>
          <ListItemButton
            className='hover:bg-gray-100'
            onClick={() => {
              handleNavigation('/user/dashboard');
              handleClick('Overview');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Overview" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* ... other list items (Data, Agent, Invoice, Marketplace, Instruction) ... */}
        {/* Data */}
        <ListItem key="Data" disablePadding>
          <ListItemButton
            className={`hover:bg-gray-100 ${activeTab === 'Data' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              handleClickData();
              handleClick('Data');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Data" sx={{ opacity: open ? 1 : 0 }} />
            {open && (openData ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={openData} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem key="Documents" disablePadding>
              <ListItemButton
                className={`hover:bg-gray-100 ${activeTab === 'Documents' ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  handleNavigation('/user/data/documents');
                  handleClick('Documents');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Documents" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Contracts" disablePadding>
              <ListItemButton
                className={`hover:bg-gray-100 ${activeTab === 'Contracts' ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  handleNavigation('/user/data/invoice');
                  handleClick('Contracts');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Contracts" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Agent */}
        <ListItem key="Agent" disablePadding>
          <ListItemButton
            className={`hover:bg-gray-100 ${activeTab === 'Agent' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              handleClickAgents();
              handleClick('Agent');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Agent" sx={{ opacity: open ? 1 : 0 }} />
            {open && (openAgents ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={openAgents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem key="Create Agent" disablePadding>
              <ListItemButton
                className={`hover:bg-gray-100 ${activeTab === 'Create Agent' ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  handleNavigation('/user/bots/setting');
                  handleClick('Create Agent');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Create Agent" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Your Agents" disablePadding>
              <ListItemButton
                className={`hover:bg-gray-100 ${activeTab === 'Your Agents' ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  handleNavigation('/user/bots');
                  handleClick('Your Agents');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Preview />
                </ListItemIcon>
                <ListItemText primary="Your Agents" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Invoice */}
        <ListItem key="Invoice" disablePadding>
          <ListItemButton
            className={`hover:bg-gray-100 ${activeTab === 'Invoice' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              handleClickInvoice();
              handleClick('Invoice');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Invoice" sx={{ opacity: open ? 1 : 0 }} />
            {open && (openInvoice ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={openInvoice} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* <ListItem key="Invoice Preview" disablePadding>
              <ListItemButton
                className="hover:bg-gray-100"
                onClick={() => {
                  handleNavigation('/user/invoice/preview');
                  handleClick('Invoice Preview');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Preview />
                </ListItemIcon>
                <ListItemText primary="Invoice Preview" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            {/* <ListItem key="Schedule Invoice" disablePadding>
              <ListItemButton
                className="hover:bg-gray-100"
                onClick={() => {
                  handleNavigation('/user/invoice/schedule');
                  handleClick('Schedule Invoice');
                }}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Schedule Invoice" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
          </List>
        </Collapse>

        {/* Marketplace */}
        <ListItem key="Marketplace" disablePadding>
          <ListItemButton
            className={`hover:bg-gray-100 ${activeTab === 'Marketplace' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              handleNavigation('/user/marketplace');
              handleClick('Marketplace');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Marketplace" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Instruction */}
        <ListItem key="Instruction" disablePadding>
          <ListItemButton
            className={`hover:bg-gray-100 ${activeTab === 'Instruction' ? 'bg-gray-100' : ''}`}
              onClick={() => {
              handleNavigation('/user/instruction');
              handleClick('Instruction');
            }}
            sx={{ pl: open ? 3 : 2, pr: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <LiveHelp />
            </ListItemIcon>
            <ListItemText primary="Instruction" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

      </List>

      {/* Bottom Toggle Button */}
    </Drawer>
  );
};

export default Sidebar;