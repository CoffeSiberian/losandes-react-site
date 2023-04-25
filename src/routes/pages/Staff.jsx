import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";
import useFetch from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import StaffCard from "../../components/StaffCard";

import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
    STAFF_IDS,
} from "../../helpers/configs";

const Staff = () => {
    const loaded = useRef(false);
    const filterStaffMem = useRef(false);
    const [Response, setResponse] = useState(false);
    const { themeTatailwind } = useDarkMode();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_URL_GET}`,
        "POST",
        {
            "Content-Type": "application/json",
        }
    );

    const getMembers = async () => {
        let bodyQuery = {
            url: `${TMP_API_URL}/vtc/${COMPANY_ID}/members`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
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
            <div className="flex w-full justify-center">
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

    const renderStaff = () => {
        let staff = filterStaff();
        if (staff.length === 0) return <EmptyData msj={"No hay Staff"} />;

        return (
            <div className="grid grid-cols-3 gap-4 place-items-center">
                {staff.map((member) => {
                    if (!member.is_owner) {
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
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default Staff;
