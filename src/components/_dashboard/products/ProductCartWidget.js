import { useState } from 'react';

import { Icon } from '@iconify/react';
import qrCodeScan from '@iconify/icons-bi/qr-code-scan';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';

// import Qrscanner from '../../Qrscanner'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { QrReader } from '@blackbox-vision/react-qr-reader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(2.4),
  paddingBottom: theme.spacing(2.4),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState('No result');

  return (
    <RootStyle>
      <Badge onClick={handleOpen} color="error" max={99}>
        <Icon icon={qrCodeScan} width={36} height={36} />
      </Badge>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  const axios = require("axios");
                  setData(result?.text);
                  const token = localStorage.getItem("token");
                  setOpen(false)
                  axios.post("http://localhost:3000/api/present",
                    {
                      class: result
                    }, {
                    headers: {
                      token: token
                    }

                  }).then((resp) => {
                    console.log("resp.data");
                  }).catch(error => {
                    console.error(error);
                  })
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: '100%' }}
            />
            <p>{data}</p>
          </>
        </Box>
      </Modal>
    </RootStyle>
  );
}
