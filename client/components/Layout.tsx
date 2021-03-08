import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Typography } from "@material-ui/core";
import "../styles/Nav.module.css";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div style={{ height: "100%", width: "100%" }}>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<header>
			<div style={{ width: "100%", alignContent: "center" }}>
				<nav>
					<Typography variant="h4" align="center">
						<Link href="/">
							<a className="nav-item">Home</a>
						</Link>{" "}
						|{" "}
						<Link href="/about">
							<a className="nav-item">About</a>
						</Link>
					</Typography>
				</nav>
			</div>
		</header>
		{children}
	</div>
);

export default Layout;
