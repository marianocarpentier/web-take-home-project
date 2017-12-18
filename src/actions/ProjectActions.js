const postProject = payload => {
    console.log(payload);

    return {
        type: "POST_PROJECT",
        payload
    }
}

export {
    postProject
}