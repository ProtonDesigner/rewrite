import React, { useEffect, useState, FC } from 'react'
import "./Home.scss"

import Sidebar, { SidebarItem, getAsset } from "./Sidebar"
import Separator from '../../components/Separator'
import Dashboard from './dashboard'
import PocketBase from "pocketbase"
import Login from './login'
import BaseComponentProps from '../../BaseComponentProps'

const server_url = "https://proton-db.pockethost.io"
const pb = new PocketBase(server_url)

interface HomeProps extends BaseComponentProps {}

export default function Home<FC>(props: HomeProps) {
    const [currentPage, setPage] = useState(0)
    const [currentUser, setCurrentUser] = useState(pb.authStore.model)


    console.log(currentPage)
    useEffect(() => {
        pb.authStore.onChange((auth) => {
            console.log("auth changed", auth)
            setCurrentUser(pb.authStore.model)
        })
    })

    const pages = [
        Login,
        Dashboard
    ]

    let Component = pages[currentPage]

    return (
        <div className={`${props.className} home`}>
            <Sidebar>
                <SidebarItem
                    icon={<img src={getAsset("user.png")} />}
                    onClick={() => setPage(0)}
                    rounded
                >
                    {currentUser ? currentUser.username : "Sign In"}
                </SidebarItem>
                <Separator />
                <SidebarItem
                    icon={<img src={getAsset("dashboard.png")}/>}
                    onClick={() => setPage(1)}
                >
                    Dashboard
                </SidebarItem>
                <SidebarItem icon={<img src={getAsset("folder.png")}/>}>
                    Projects
                </SidebarItem>
                <SidebarItem icon={<img src={getAsset("cogwheel.png")}/>} style={{
                    position: "absolute",
                    bottom: "0"
                }}>
                    Settings
                </SidebarItem>
            </Sidebar>
            <div className='page'>
                <Component pb={pb} currentUser={currentUser} setCurrentUser={setCurrentUser} state={props.state} setState={props.setState} setCurrentPage={props.setPage} />
            </div>
        </div>
    )
}