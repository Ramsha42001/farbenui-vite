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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openData, setOpenData] = React.useState(false);
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const [openAgents, setOpenAgents] = React.useState(false);
  const [open, setOpen] = React.useState(false); // State for sidebar collapse

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
  const collapsedDrawerWidth = 72; // Adjust as needed

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
          mt: 'auto', // Push the box to the bottom
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          width: '100%',
          p: 1,
        }}
      >
        <Tooltip title={open ? 'Collapse' : 'Expand'}  sx={{ pl: open ? 3 : 2, pr: 3 }}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Tooltip>
      </Box>
      {/* Main List */}
      <List sx={{ flexGrow: 1 }}> {/* Added flexGrow: 1 */}
        {/* Overview */}
        <ListItem key="Overview" disablePadding>
          <ListItemButton
            className="hover:bg-gray-100"
            onClick={() => handleNavigation('/user/dashboard')}
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
            className="hover:bg-gray-100"
            onClick={handleClickData}
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
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/data/documents')}
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
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/data/invoice')}
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
            className="hover:bg-gray-100"
            onClick={handleClickAgents}
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
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/bots/setting')}
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
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/bots')}
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
            className="hover:bg-gray-100"
            onClick={handleClickInvoice}
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
            {/* <ListItem key="Generate Invoice" disablePadding>
              <ListItemButton
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/invoice/generate')}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Generate Invoice" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            <ListItem key="Invoice Preview" disablePadding>
              <ListItemButton
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/invoice/preview')}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Preview />
                </ListItemIcon>
                <ListItemText primary="Invoice Preview" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Schedule Invoice" disablePadding>
              <ListItemButton
                className="hover:bg-gray-100"
                onClick={() => handleNavigation('/user/invoice/schedule')}
                sx={{ pl: open ? 8 : 2, pr: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Schedule Invoice" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Marketplace */}
        <ListItem key="Marketplace" disablePadding>
          <ListItemButton
            className="hover:bg-gray-100"
            onClick={() => handleNavigation('/user/marketplace')}
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
            className="hover:bg-gray-100"
            onClick={() => handleNavigation('/user/instruction')}
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