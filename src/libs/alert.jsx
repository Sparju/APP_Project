
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const AlertBox=({severty,data})=>{
    return (
<Alert icon={<CheckIcon fontSize="inherit" />} severity={severty}>
  {data}
</Alert>
    )
}
export default AlertBox
