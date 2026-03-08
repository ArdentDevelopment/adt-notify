CreateThread(function()
    if GetCurrentResourceName() ~= "adt-notify" then
        while true do
            print("^1[ERROR] ^0You cannot change the name of this script! Please change it back to the original name: ^3adt-notify^0")
            Wait(100)
        end
    end
end)
