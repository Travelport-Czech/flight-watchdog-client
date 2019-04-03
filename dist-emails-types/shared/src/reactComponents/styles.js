const primaryTextColor = '#333';
const secondaryTextColor = '#666';
const secondaryBackgroundColor = 'rgb(249, 249, 249)';
const bellImageBackground = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI2NHB4IiBpZD0iU1ZHUm9vdCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI2NHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcyBpZD0iZGVmczM4NDgiLz48ZyBpZD0ibGF5ZXIxIj48ZyBpZD0iZzUyMDEiIHN0eWxlPSJzdHJva2U6IzAwMDAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQsLTIxLjI1KSI+PHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0iTSAtMjguNTMxNDU5LDUxLjQyNjA2MSBWIDY3LjQ1NzUyIEggLTEyLjUgMy41MzE0NTg5IFYgNTEuNDI2MDYxIGMgMCwtOC44MzE3MDIgLTcuMTk5NzU3LC0xNi4wMzE0NTkgLTE2LjAzMTQ1ODksLTE2LjAzMTQ1OSB2IDAgYyAtOC44MzE3MDIsMCAtMTYuMDMxNDU5LDcuMTk5NzU3IC0xNi4wMzE0NTksMTYuMDMxNDU5IHoiIGlkPSJwYXRoMjciIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOm5vbmU7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDAwMDU0MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO2ltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7c2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb24iLz48cGF0aCBjbGFzcz0iZmlsMCBzdHIwIiBkPSJtIC0xMy4yNjc5NzQsNDAuNzcwNDIxIHYgMCBjIC01LjE4MzgyNSwwIC05LjMxMTY4Niw0LjIyMzg1NyAtOS4zMTE2ODYsOS4zMTE2ODUiIGlkPSJwYXRoMjkiIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOm5vbmU7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDAwMDU0MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO2ltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7c2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb24iLz48cGF0aCBjbGFzcz0iZmlsMCBzdHIxIiBkPSJtIC0xMi42OTE5OTQsNDMuNjUwMzIzIHYgMCBtIC0zLjU1MTg4LC03Ljg3MTczNCB2IC0yLjg3OTkwMiBjIDAsLTIuMDE1OTMyIDEuNjMxOTQ1LC0zLjU1MTg4IDMuNTUxODgsLTMuNTUxODggdiAwIGMgMi4wMTU5MzIsMCAzLjU1MTg4MDksMS42MzE5NDQgMy41NTE4ODA5LDMuNTUxODggdiAyLjg3OTkwMiIgaWQ9InBhdGgzMSIgc3R5bGU9ImNsaXAtcnVsZTpldmVub2RkO2ZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6Mi4wMDAwNTQxMjtpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5O3NoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247dGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uIi8+PHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0ibSAtNC42MjgyNjYxLDcxLjc3NzM3NCBjIC0xLjI0Nzk1OCwzLjE2Nzg5MyAtNC4zMTk4NTQsNS4zNzU4MTkgLTcuODcxNzMzOSw1LjM3NTgxOSAtMy41NTE4OCwwIC02LjcxOTc3MywtMi4xMTE5MjkgLTcuODcxNzM0LC01LjI3OTgyMiIgaWQ9InBhdGgzMyIgc3R5bGU9ImNsaXAtcnVsZTpldmVub2RkO2ZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6Mi4wMDAwNTQxMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7aW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTtzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uO3RleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbiIvPjwvZz48L2c+PC9zdmc+)';
export const primaryColor = {
    color: primaryTextColor
};
export const secondaryColor = {
    color: secondaryTextColor
};
export const secondaryBackground = {
    backgroundColor: secondaryBackgroundColor
};
export const chatBox = {
    ...primaryColor,
    backgroundColor: 'white',
    border: '0px solid #eee',
    borderBottom: 'none',
    bottom: '0',
    boxShadow: '0px 0px 5px rgba(0,0,0,.3)',
    font: "normal normal 11px 'Roboto',sans-serif",
    position: 'fixed',
    right: '10px',
    textAlign: 'center',
    width: '400px',
    zIndex: 9999
};
export const checkBoxInput = {
    cursor: 'pointer',
    display: 'block',
    filter: 'alpha(opacity=0)',
    height: '26px',
    left: '0',
    margin: '0 0',
    opacity: 0,
    padding: '0 0',
    position: 'absolute',
    right: '0',
    top: '0',
    width: '100%',
    zIndex: 4
};
export const label = {
    ...primaryColor,
    backgroundColor: '#f9f9f9',
    border: '1px solid #aaa',
    display: 'block',
    fontSize: '13px',
    fontWeight: 'bold',
    height: '24px',
    lineHeight: '26px',
    padding: '0 1em 1px'
};
export const content = {
    backgroundColor: '#f9f9f9',
    boxShadow: 'inset 0px 11px 8px -10px #CCC',
    height: '120px',
    padding: '20px',
    textAlign: 'left'
};
export const icon = {
    background: bellImageBackground,
    backgroundSize: '20px 20px',
    display: 'block',
    height: '20px',
    left: '12px',
    position: 'absolute',
    top: '4px',
    width: '20px'
};
const defaultInputItem = {
    ...primaryColor,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '13px',
    margin: '0px',
    padding: '10px'
};
export const input = {
    ...defaultInputItem,
    marginRight: '5px',
    width: '240px'
};
export const button = {
    ...defaultInputItem,
    fontWeight: 'bold',
    transition: 'all 300ms linear',
    width: '90px'
};
export const buttonHovered = {
    ...primaryColor,
    backgroundColor: '#ddd',
    border: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'all 300ms linear'
};
export const buttonLink = {
    ...secondaryColor,
    background: 'transparent',
    border: 'none',
    lineHeight: '26px',
    textDecoration: 'underline'
};
export const buttonLinkHovered = {
    cursor: 'pointer',
    textDecoration: 'none'
};
export const crossButton = {
    cursor: 'pointer',
    display: 'block',
    fontSize: '20px',
    position: 'absolute',
    right: '10px',
    top: '5px'
};
export const errorText = {
    color: 'red'
};
export const boldText = {
    fontWeight: 'bold'
};
export const header = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    textAlign: 'left'
};
export const headerText = {
    fontSize: '20px',
    lineHeight: '20px',
    marginBottom: '10px',
    ...boldText
};
export const headerTextDescription = {
    color: secondaryTextColor,
    fontSize: '13px',
    lineHeight: '16px',
    marginBottom: '15px'
};
export const headerDestinations = {
    ...secondaryColor,
    fontSize: '18px',
    lineHeight: '28px',
    marginBottom: '10px'
};
export const headerDates = {
    color: secondaryTextColor,
    fontSize: '13px',
    lineHeight: '13px',
    marginBottom: '15px'
};
export const simpleText = {
    color: secondaryTextColor,
    fontSize: '13px',
    lineHeight: '20px',
    marginTop: '0px'
};
export const emailBlock = {
    borderBottom: '1px solid #ccc',
    marginBottom: '20px',
    paddingBottom: '20px',
    textAlign: 'left'
};
export const emailTableContent = {
    borderTop: '1px solid #ddd',
    padding: '20px',
    textAlign: 'center'
};
export const emailButton = {
    backgroundColor: 'white',
    border: '1px solid rgb(204, 204, 204)',
    borderRadius: '5px',
    color: 'rgb(102, 102, 102)',
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 300ms linear 0s',
    width: '110px'
};
//# sourceMappingURL=styles.js.map