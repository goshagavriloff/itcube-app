const client={
    projectId:process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion:'v2023-07-22'
};

export const urlFor=(query)=>{
    const {projectId,dataset,apiVersion}=client;
    query=encodeURIComponent(query);
    return `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;
}

export const fetchJSON=(url)=>{
    return fetch(url).then((response) => response.json());
}