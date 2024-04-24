import TextField from "@mui/material/TextField"
import * as React from "react"
import { Campaign } from "../campaign.types"

interface ICampaignInformation {
    campaign: Campaign
    showError: boolean
    onCampaignChange: (data: any) => void
}
export const CampaignInformation = (props: ICampaignInformation) => {
    const [campaign, setCampaign] = React.useState(props.campaign)
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {props.onCampaignChange(campaign)}, [campaign])

    return (
        <>
            <div className={'text-start mx-auto mt-2 w-75 border border-secondary rounded ps-4'}>
                <p className="campaign-text mb-2 mt-3">Thông tin </p>
                <div className="my-2">
                    <TextField
                        className={'my-2'}
                        label='Tên chiến dịch' required={true} placeholder='Vui lòng điền tên chiến dịch'
                        value={campaign.information?.name}
                        error={props.showError && !campaign.information?.name}
                        helperText={props.showError && !campaign.information?.name ? 'Thiếu tên chiến dịch' : ''}
                        onChange={(event) => {
                            let value = event?.target?.value;
                            campaign.information = {
                                name: value,
                                describe: campaign?.information?.describe
                            }
                            
                            setHasError(!value)

                            
                            setCampaign({ ...campaign })
                        }}></TextField>
                </div>
                <div className="my-2">
                    <TextField className={'my-2'} label='Mô tả' value={campaign.information?.describe} placeholder='Vui lòng điền mô tả'
                        onChange={(event) => {
                            let value = event?.target?.value;
                            campaign.information = {
                                name: campaign?.information?.name,
                                describe: value
                            }
                            setCampaign({ ...campaign })
                        }}></TextField>
                </div>
            </div>
        </>
    )
}