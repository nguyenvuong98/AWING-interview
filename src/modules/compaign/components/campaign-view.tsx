import * as React from 'react';
import { Campaign, SubCampaign, TabPanelProps } from '../campaign.types';
import { CampaignInformation } from './campaign-information';
import { CampaignSub } from './campaign-sub';
import { Button, Box, Tab, Tabs, Typography, Alert, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Mockcampaign = () => {
  let campaign: Campaign = {
    information: {
      name: '',
      describe: ''
    },
    subCampaigns: [{
      name: 'Chiến dịch 1',
      status: true,
      ads: [{
        name: 'quảng cáo 1',
        quantity: 1
      }]
    }]
  }
  return campaign
}
const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  if (index >= 2) { return }
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const CampaignView = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [campaign, setCampaign] = React.useState<Campaign>({} as Campaign);
  const [subCampaigns, setSubcampaigns] = React.useState<SubCampaign[]>([]);
  const [showError, setShowError] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const initData = () => {
    if (!campaign) { return }
    let mockCompain: Campaign = Mockcampaign();
    setCampaign({ ...mockCompain })
    setSubcampaigns(prev => [...prev, ...mockCompain.subCampaigns])
  }

  const addSubCompaign = () => {
    let newSubCompain: SubCampaign = {
      name: '',
      status: false,
      ads: []
    }

    setSubcampaigns((prev) => { return [...prev, newSubCompain] })
  }

  React.useEffect(() => {
    initData()
  }, [])

  const checkError = () => {

    if (campaign?.information?.name == '') {
      setHasError(true)
      return
    } else {
      setHasError(false)
    }

    if (!subCampaigns?.length) {return}

    subCampaigns.forEach(subCampaign => {
      if (subCampaign.name == '') {
        setHasError(true)
        return;
      } else {
        setHasError(false)
      }

      if(!subCampaign?.ads?.length) { return }

      subCampaign.ads.forEach(ad => {
        if (ad.name == '' || !ad.quantity || ad.quantity <= 0) {
          setHasError(true)
          return;
        } else {
          setHasError(false)
        }
      })
    })
  }

  return (
    <>
      {showError && hasError ? <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error">Vui lòng nhập đầy đủ thông tin.</Alert>
        </Snackbar>
      </>
        : showError && !hasError ? <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success">Gửi thông tin thành công.</Alert>
          </Snackbar>
        </> : <></>}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Thông tin" {...a11yProps(0)} />
            <Tab label="Chiến dịch con" {...a11yProps(1)} />
            <Tab icon={<SendIcon />} iconPosition="start" label="Gửi" {...a11yProps(2)} onClick={(event) => { setShowError(true); setTabIndex(0); handleClick(); checkError(); }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabIndex} index={0}>
          <CampaignInformation onCampaignChange={(data) => {setCampaign({...data})}} showError={showError} campaign={campaign}></CampaignInformation>
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          <>
            {subCampaigns?.length && subCampaigns?.map((subCampaign, index) => {
              return (
                <div key={'subCampaign' + index}>
                  <CampaignSub showError={showError} subcampaign={subCampaign}
                    onSubCampaignChange={(data) => {
                      subCampaigns[index] = data;
                      setSubcampaigns(() => [...subCampaigns])
                    }}></CampaignSub>
                </div>
              )
            })}
            <div className="text-end mx-auto mt-2 w-75">
              <Button variant="contained" color="secondary" onClick={() => addSubCompaign()}>
                Thêm
              </Button>
            </div>

          </>
        </CustomTabPanel>
      </Box>
    </>
  )
}