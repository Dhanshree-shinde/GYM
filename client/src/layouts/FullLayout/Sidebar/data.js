import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/client/dashboards/dashboard1",
  },
  {
    title: "Notification",
    icon: DashboardOutlinedIcon,
    href: "/client/notification",
  },
  
  {
    title: "Account",
    icon: DescriptionOutlinedIcon,
    href: "/client/accounts/account",
  },

 
  {
    title: "WorkoutPlan",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/client/workout/workoutplan",
  },

  {
      title: "Payment",
      icon: SwitchLeftOutlinedIcon,
      href: "/client/payment/pay",
    },
];

export default Menuitems;
