import { Checkbox, TextField } from "@mui/material"
import * as React from "react"
import { subAd, SubCampaign } from "../campaign.types"
import { CampaignSubAds } from "./campaing-sub-ads"

interface ICampaignSubAds {
    subcampaign: SubCampaign
    showError: boolean
    onSubCampaignChange: (data: any) => void
}
export const CampaignSub = (props: ICampaignSubAds) => {
    const [subcampaign, setSubCampaign] = React.useState<SubCampaign>(props.subcampaign)
    const [subAds, setSubAds] = React.useState<subAd[]>(subcampaign.ads)

    const onSubAdsChange = (data: any) => {
        setSubAds(() => [...data as subAd[]])
        subcampaign.ads = subAds;
        setSubCampaign({...subcampaign})
    }

    React.useEffect(() => {
        props.onSubCampaignChange(subcampaign);

    }, [subcampaign])

    return (
        <>
            <div className="text-start mx-auto mt-2 w-75">
                <div className="border border-secondary rounded p-3">
                    <div className="my-2">
                        <TextField label='Tên chiến con' required={true}
                            placeholder='Vui lòng điền tên chiến dịch con'
                            error={props.showError && !subcampaign.name}
                            helperText={props.showError && !subcampaign.name ? 'Thiếu tên chiến dịch con' : ''}
                            value={subcampaign.name}
                            onChange={(event) => {
                                let value = event?.target?.value;
                                subcampaign.name = value;
                                setSubCampaign({ ...subcampaign })
                            }}></TextField>
                    </div>
                    <div>
                        <label className="campaign-text" htmlFor="">Trạng thái </label>
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={subcampaign.ads} />
                    </div>
                    <div className="mt-3 pl-5">
                        <CampaignSubAds showError={props.showError} subAds={subAds}
                        onSubAdsChange={(data) => {onSubAdsChange(data)}}></CampaignSubAds>
                    </div>
                </div>

            </div>
        </>
    )
}