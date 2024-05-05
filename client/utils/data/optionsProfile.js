import { Ionicons } from "@expo/vector-icons";
import PersonalInfo from "../../assets/svg/Settings/PersonalInfo";
import { SimpleLineIcons } from '@expo/vector-icons';
import LoginSecurity from "../../assets/svg/Settings/LoginSecurity";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
export const header = [
    {
        label: 'Settings',
        icon: <AntDesign name="setting" size={35} color="black" />
    },
    {
        label: 'Hosting',
    },
    {
        label: 'Support',
    }
]

export const optionsProfile = [
    {
        label: "Personal information", icon: <PersonalInfo width={30} height={30} />,
    },
    {
        label: "Login & security", icon: <LoginSecurity width={30} height={30} />,
    },
    {
        label: "Notifications", icon: <Ionicons name="notifications-outline" size={30} color="black" />,
    },
    {
        label: "Privacy and sharing", icon: <SimpleLineIcons name="lock" size={30} color="black" />,
    }
]

export const optionsHosting = [
    {
        label: "List your space",
        icon: <FontAwesome6 name="house-chimney-medical" size={24} color="black" />,
        navigationName: "ListSpace"
    },
    {
        label: "Chart", icon: <FontAwesome6 name="chart-line" size={24} color="black" />,
    },
]
export const optionsSupport = [
    {
        label: "Visit the Help Centre", icon: <FontAwesome6 name="circle-question" size={24} color="black" />,
    },
    {
        label: "Get help with a safety issue", icon: <FontAwesome6 name="shield-heart" size={24} color="black" />,
    },
    {
        label: "Report a neighbourhood concern", icon: <FontAwesome6 name="headset" size={24} color="black" />,
    },
    {
        label: "Give us feedback", icon: <FontAwesome6 name="pen-to-square" size={24} color="black" />,
    },
]