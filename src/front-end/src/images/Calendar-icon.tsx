import React from 'react';
import type { SVGProps } from 'react';

export function calendarWhite(props: SVGProps<SVGSVGElement>) {
	return (<svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" stroke="white" strokeLinejoin="round" strokeWidth={2.15}><path d="M5 19h38v21a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM5 9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v10H5z"></path><path strokeLinecap="round" d="M16 4v8m16-8v8m-4 22h6m-20 0h6m8-8h6m-20 0h6"></path></g></svg>);
}

export function calendarBlack(props: SVGProps<SVGSVGElement>) {
	return (<svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" stroke="black" strokeLinejoin="round" strokeWidth={2.15}><path d="M5 19h38v21a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM5 9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v10H5z"></path><path strokeLinecap="round" d="M16 4v8m16-8v8m-4 22h6m-20 0h6m8-8h6m-20 0h6"></path></g></svg>);
}