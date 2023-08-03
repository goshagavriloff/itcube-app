export const categoryQuery=()=>{
    const query=`*[_type=="category"]{
        name,
        icon
    }`;
    return query;
}

export const feedQuery=`*[_type=="post"]{
    caption,
    _createdAt,
    _id,
    "topic":topic->name, 
    "url":media.asset->url,
    "ext":media.asset->extension
  }`;

export const searchQuery=(searchTerm)=>{
    const query=`*[_type=="post"&&(caption match '*${searchTerm}*' || topic->name match '*${searchTerm}*')]{
        caption,
        _createdAt,
        _id,
        "topic":topic->name, 
        "url":media.asset->url,
        "ext":media.asset->extension
      }`;
    return query;
}

export const postDetailQuery=(id)=>{
    const query=`*[_type=="post" && _id == '${id}']{
        caption,
        _createdAt,
        _id,
        "topic":topic->name, 
        "url":media.asset->url,
        "ext":media.asset->extension,
        desc
      }`;
    return query;
}