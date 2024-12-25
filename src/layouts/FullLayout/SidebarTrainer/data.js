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
    title: "All user",
    icon: DashboardOutlinedIcon,
    href: "/trainer/all-users",
  },

  {
    title: "Assigned Clients",
    icon: DashboardOutlinedIcon,
    href: "/trainer/assigned-users",
  },
  {
    title: "Assign WorkoutPlan",
    icon: DashboardOutlinedIcon,
    href: "/trainer/assign-workout-plan",
  },
  {
    title: "User Details",
    icon: DashboardOutlinedIcon,
    href: "/trainer/user-information/:clientId",
  },
 
];

export default Menuitems;
