import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import StaffCard from "../../components/MemberCard";
import ModalLoading from "../../components/ModalLoading";

import {
    TITLE,
    REST_API_URL,
    STAFF_IDS,
    STAFF_COLORS,
} from "../../helpers/configs";

const Staff = () => {
    document.title = TITLE + " | Staff";
    const loaded = useRef(false);
    const filterStaffMem = useRef(false);
    const [Response, setResponse] = useState(false);
    const { themeTatailwind } = useDarkMode();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getMembers/`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getMembers = async () => {
        const fetchResponse = await bodyResponse();
        if (fetchResponse.status === 200) {
            setResponse((await fetchResponse.json()).response.members);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getMembers();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const filterStaff = () => {
        if (!filterStaffMem.current) {
            let filter = Response.filter((member) => {
                return STAFF_IDS.roles.includes(member.role_id);
            });
            filterStaffMem.current = filter;
            return filter;
        }
        return filterStaffMem.current;
    };

    const renderOwner = () => {
        let staff = filterStaff();
        return (
            <div className="flex w-full justify-center pb-6">
                {staff.map((member) => {
                    if (member.is_owner) {
                        return (
                            <StaffCard
                                key={member.user_id}
                                id={member.user_id}
                                username={member.username}
                                roleName={member.role}
                                dateJoin={member.joinDate}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    const getRoleStaff = (role_id) => {
        // Categorizes the different staff and delivers an array according to their ID
        let staff = filterStaff();
        let role = staff.filter((member) => {
            return member.role_id === role_id;
        });
        return role;
    };

    const getRoleName = (role_id) => {
        let staff = filterStaff();
        let role = staff.filter((member) => {
            return member.role_id === role_id;
        });
        return role[0].role;
    };

    const renderStaff = () => {
        let staff = filterStaff();
        if (staff.length === 0) return <EmptyData msj={"No hay Staff"} />;

        return (
            <div className="flex flex-col gap-5 p-6">
                {STAFF_IDS.roles.map((role, index) => {
                    if (index === 0)
                        return <div className="hidden" key={role}></div>; // prevent categorizing the owner
                    let staffCategory = getRoleStaff(role);

                    if (staffCategory.length === 0) {
                        return <div className="hidden" key={role}></div>;
                    }
                    return (
                        <div
                            style={{ borderColor: STAFF_COLORS.roles[index] }}
                            className={`flex flex-col rounded-lg border-2 md:ml-4 md:mr-4`}
                            key={role}
                        >
                            <Typography
                                component="div"
                                className="flex justify-center pt-3"
                                variant="h5"
                                color={themeTatailwind.primary.color}
                            >
                                <b>{getRoleName(role)}</b>
                            </Typography>
                            <div
                                key={role}
                                className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 justify-items-center"
                            >
                                {staffCategory.map((member) => {
                                    return (
                                        <StaffCard
                                            key={member.user_id}
                                            id={member.user_id}
                                            username={member.username}
                                            roleName={member.role}
                                            dateJoin={member.joinDate}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderPage = () => {
        if (Response.length > 0) {
            return (
                <>
                    {renderOwner()}
                    {renderStaff()}
                </>
            );
        } else {
            return <EmptyData msj={"No hay Staff"} />;
        }
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar el Staff"} />;
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Nuestro Staff</b>
                </Typography>
            </div>
            <ModalLoading open={loading} />
            {checkError()}
        </>
    );
};

export default Staff;
