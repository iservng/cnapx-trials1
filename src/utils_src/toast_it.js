function toastIt(color, msg)
{
    M.Toast.dismissAll();
    M.toast({html: msg, classes: color});
}
export { toastIt };