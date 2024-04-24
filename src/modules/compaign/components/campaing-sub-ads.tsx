import { Button, TextField } from "@mui/material"
import * as React from "react"
import { subAd } from "../campaign.types"

interface ICampaignSubAds {
    subAds: subAd[]
    showError: boolean
    onSubAdsChange: (data: any) => void
}
export const CampaignSubAds = (props: ICampaignSubAds) => {
    const [subAds, setSubAds] = React.useState<subAd[]>(props.subAds)

    const initSubAds = () => {
        if (subAds && subAds.length) { return; }

        let mockSubAds: subAd = {
            name: 'Quảng cáo 1',
            quantity: 1
        }

        setSubAds((prev) => [...prev, mockSubAds])
    }

    const addSubAd = () => {
        let newSubAd: subAd = {name: '', quantity: 0} as subAd

        subAds.push(newSubAd)
        setSubAds((prev) => [...prev])
    }

    React.useEffect(() => {
        props.onSubAdsChange(subAds)
    }, subAds)

    React.useEffect(() => {
        initSubAds();
    }, [])

    return (
        <>
            <div className="border border-info rounded p-2 ps-4">
                <div className="mb-3" >
                    <label htmlFor="" className="campaign-text">Quảng cáo</label>
                </div>
                {subAds?.length && subAds.map((subAd, index) => {
                    return (
                        <>
                            <div key={'sub-ad-' + index}>
                                <p style={{ 'fontWeight': '700', 'fontSize': 'small' }} className="ms-2">Quảng cáo: {index + 1}</p>
                                <div className="my-2 ms-4">
                                    <TextField className="font-weight-bold"
                                        label='Tên quảng cáo'
                                        required={true}
                                        style={{ 'width': '320px' }}
                                        placeholder='Vui lòng điền tên quảng cáo'
                                        error={props.showError && !subAds[index].name}
                                        helperText={props.showError && !subAds[index].name ? 'Thiếu tên quảng cáo' : ''}
                                        value={subAd.name}
                                        onChange={(event) => {
                                            subAds[index].name = event?.target?.value;
                                            setSubAds(() => [...subAds])
                                        }}></TextField>
                                </div>
                                <div className="my-3 ms-4">
                                    <TextField required={true}
                                        type='number'
                                        label='Số lượng'
                                        style={{ 'width': '320px' }}
                                        value={subAd.quantity}
                                        placeholder='vui lòng nhập số lượng'
                                        error={props.showError && (!subAds[index].quantity || subAds[index].quantity <= 0)}
                                        helperText={props.showError && (!subAds[index].quantity || subAds[index].quantity <= 0) ? 'Thiếu tên số lượng hoặc số lượng nhỏ hơn 0' : ''}
                                        onChange={(event) => {
                                            let value = Number(event?.target?.value);

                                            subAds[index].quantity = value;
                                            setSubAds(() => [...subAds])
                                        }}
                                    >
                                    </TextField>
                                </div>
                            </div>
                        </>
                    )
                })}

                <Button variant="contained" color="primary" className="mt-2" onClick={() => addSubAd()}>
                    Thêm
                </Button>
            </div>
        </>
    )
}