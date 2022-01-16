import { Icon } from '@iconify/react';
import qrCodeScan from '@iconify/icons-bi/qr-code-scan';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';

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
  return (
    <RootStyle>
      <Badge  color="error" max={99}>
        <Icon icon={qrCodeScan} width={36} height={36} />
      </Badge>
    </RootStyle>
  );
}
