import React, { useState } from 'react';
import { postUrl } from '../../apiCalls';

function UrlForm({setUrls, urls}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const urlObject = formatPostObject()
    postUrl(urlObject)
    .then(data => {
      setUrls([...urls, data])
    }).catch(err => console.log(err))
    clearInputs();
  }

  const formatPostObject = () => {
    return {
      long_url: urlToShorten,
      title: title
    }
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='title'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
