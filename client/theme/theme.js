import { StyleSheet } from "react-native";

export const SPACING = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_32: 32,
    space_36: 36,
}
export const COLORS = {
    Black: "#000000",
    BlackRGB10: "rgba(0, 0, 0, 0.1)",
    primary: '#FF385C',
    dark: '#1A1A1A',
    Grey: "#333333",
    DarkGrey: '#ebebeb',
    Yellow: '#E1CD17',
    White: "#FFFFFF",
    WhiteRGBA758: 'rgba(255,255,255,0.75)',
    WhiteRGBA50: "rgba(255,255,255,0.50)",
    WhiteRGBA32: "rgba(255, 255, 255, 0.32)",
    WhiteRGBA15: "rgba(255, 255, 255, 0.15)",
    WhiteGrey: "#5E5D5E"
}

export const FONTFAMILY = {
    poppins_black: 'Poppins-Black',
    poppins_bold: 'Poppins-Bold',
    poppins_extrabold: 'Poppins-Extraßold',
    poppins_extralight: 'Poppins-Extralight',
    poppins_light: 'Poppins-Light',
    poppins_medium: 'Poppins-Medium',
    poppins_regular: 'Poppins-Regular',
    poppins_semibold: 'Poppins-SemiBold',
    poppins_thin: 'Poppins-Thin',
};

export const FONTSIZE = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_30: 30,
}

export const BORDERRADIUS = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25
}

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFFFF',
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    footer: {
        position: 'absolute',
        height: 70,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: COLORS.Grey,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});

export const categories = [
    {
        name: 'Tiny homes',
        icon: 'home',
    },
    {
        name: 'Cabins',
        icon: 'house-siding',
    },
    {
        name: 'Trending',
        icon: 'local-fire-department',
    },
    {
        name: 'Play',
        icon: 'videogame-asset',
    },
    {
        name: 'City',
        icon: 'apartment',
    },
    {
        name: 'Beachfront',
        icon: 'beach-access',
    },
    {
        name: 'Countryside',
        icon: 'nature-people',
    },
];