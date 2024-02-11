import Paper from "@mui/material/Paper";
import { SvgIcon, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useDarkMode } from "../hooks/contex/DarkModeContex";

// icons
import truackersmpicon from "../static/img/truckersmpicon.webp";
import logo from "../static/img/logo.webp";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    const { darkMode, themeTatailwind } = useDarkMode();
    const social = [
        {
            name: "Instagram",
            logo: <InstagramIcon />,
            link: "https://www.instagram.com/AndesVTC/",
        },
        {
            name: "YouTube",
            logo: <YouTubeIcon />,
            link: "https://www.youtube.com/channel/UC2aPVnV_I9-k_JlBoTQe2Ig/videos",
        },
        {
            name: "TruckersMP",
            logo: (
                <img
                    className="w-4 h-4 mr-1"
                    src={truackersmpicon}
                    alt="truckersicon"
                />
            ),
            link: "https://truckersmp.com/vtc/55250-andesvtc",
        },
        {
            name: "Discord",
            logo: (
                <SvgIcon color="white">
                    <path d="m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z" />
                </SvgIcon>
            ),
            link: "https://discord.gg/BvYaVzGBmn",
        },
    ];

    return (
        <div className="mt-auto mb-4">
            <Paper
                elevation={24}
                sx={{
                    backgroundColor: darkMode
                        ? themeTatailwind.secundary.main
                        : "secundary.main",
                }}
            >
                <div className="flex justify-center p-2 drop-shadow-md">
                    <img
                        className="h-auto w-10 mr-2 rounded-lg"
                        src={logo}
                        alt="logo"
                    />
                    <Typography variant="h4">
                        <b>Los Andes VTC</b>
                    </Typography>
                </div>
                <div className="flex justify-center p-2">
                    <Typography>Empresa verificada por&nbsp;</Typography>
                    <Typography color="error">
                        <b>Truckers MP&nbsp;</b>
                    </Typography>
                    <VerifiedUserIcon color="secondary" />
                </div>
                <div className="flex justify-center mb-3 mt-3">
                    <ul className="justify-end md:inline-flex">
                        {social.map((obj) => (
                            <li className="mr-3 ml-3" key={obj.name}>
                                <Link
                                    className="flex justify-start md:justify-center items-center p-2"
                                    color={darkMode ? "white" : "black"}
                                    href={obj.link}
                                    target="_blank"
                                    underline="none"
                                >
                                    {obj.logo}
                                    <Typography variant="subtitle2">
                                        {obj.name}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center mb-2">
                    <Link
                        className="flex justify-center gap-1 items-center p-2"
                        color={darkMode ? "white" : "black"}
                        href="https://github.com/CoffeSiberian"
                        target="_blank"
                        underline="none"
                    >
                        <Typography variant="caption">
                            by: <b>SiberianCoffe</b>
                        </Typography>
                        <GitHubIcon />
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default Footer;
