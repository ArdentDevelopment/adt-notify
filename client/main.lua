local function ShowNotification(type, message, duration)
    local title = Config.Titles[type] or "Notification"
    local position = Config.Position or "top-right"
    
    SendNUIMessage({
        action = 'notify',
        type = type,
        title = title,
        message = message,
        position = position,
        duration = duration or Config.DefaultDuration or 5000
    })
end

exports("Notify", ShowNotification)

RegisterNetEvent('adt-notify:client:Notify', function(type, message, duration)
    ShowNotification(type, message, duration)
end)

CreateThread(function()
    if GetCurrentResourceName() ~= "adt-notify" then
        while true do
            print("^1[ERROR] ^0You cannot change the name of this script! Please change it back to the original name: ^3adt-notify^0")
            Wait(100)
        end
    end
end)

