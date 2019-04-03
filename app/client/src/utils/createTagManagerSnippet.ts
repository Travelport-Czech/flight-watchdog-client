export const createTagManagerSnippet = (analyticsId: string): void => {
  const script = document.createElement('script')
  // tslint:disable-next-line:max-line-length
  const text = document.createTextNode(
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" +
      analyticsId +
      "');"
  )
  script.appendChild(text)
  if (document.head) {
    document.head.appendChild(script)
  }

  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', 'https://www.googletagmanager.com/ns.html?id=' + analyticsId)
  iframe.setAttribute('height', '0')
  iframe.setAttribute('width', '0')
  iframe.setAttribute('style', 'display:none;visibility:hidden')
  noscript.appendChild(iframe)
  document.body.appendChild(noscript)
}
