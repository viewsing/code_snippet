exportExcel = async () => {
    const { importResult } = this.state
    const { recordId } = this.props.editHistory
    //方式一：打开一个链接
    window.open(url + makeQueryString({importResult, recordId: recordId && parseInt(recordId)}))
    //方式二：提交form
    let iframe = document.querySelector('#product_export_iframe')
    //没有就先创建一个iframe
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.id = 'product_export_iframe'
      iframe.style.display = 'none'
      const body = document.body
      body.appendChild(iframe)
    }
    //创建隐藏的提交表单，用于异步导出excel
    const form = document.createElement('form')
    form.setAttribute('method', 'POST')
    form.setAttribute('accept', 'application/ms-excel;charset=UTF-8')
    form.setAttribute('action', urlBase + makeQueryString({importResult, recordId: recordId && parseInt(recordId)}) )
    //iframe触发onload事件时说明导出失败
    iframe.onload = () => {
      showMessage('导出失败')
    }
    iframe.contentWindow.document.body.appendChild(form)
    form.submit()
    
    //方式三:HTML5的download属性和 XMLHttpRequest2 的 blob 类型responseType
    this.setState({ exporting: true })
    const xhr = new XMLHttpRequest()
    xhr.open('GET',  url + makeQueryString({ importResult, recordId }))
    xhr.responseType = 'blob'
    xhr.onload = () => {
      const link = document.createElement('a')
      const body = document.body
      const disposition = xhr.getResponseHeader('content-disposition')
      const fileName = disposition.match(/filename=(.+)/)[1]
      link.href = window.URL.createObjectURL(xhr.response)
      link.download = decodeURIComponent(fileName)
      link.style.display = 'none'
      body.appendChild(link)
      link.click()
      body.removeChild(link)
      this.setState({ exporting: false })
    }
    xhr.onerror = () => {
      showMessage('导出失败')
      this.setState({ exporting: false })
    }
    xhr.send()
  }
