const asyncHandler = (requesHandler) =>{
    return (req, res, next) =>{
        Promise.resolve(requesHandler(req, res, next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}





















// const asyncHandler = (fn) => (req, res, next)=>{
//     try {
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }