import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Market from 'config/abi/Market.json'
import HappyCows from 'config/abi/HappyCows.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN } from "web3-utils"
import Web3 from "web3";
import { getHappyCowAddress, getMarketAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'

const NftOnChainDataContainer = styled.div`
    display: flex;
    min-width: 280px;
    max-width: 330px;
    width: 30%;
    padding: 32px;
    box-sizing: border-box;
    flex-direction: column;
`

const NftOnChainDataTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #431216;
`

const NftOnChainDetailContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
`

const NftOnChainDetail = styled.div`
    padding: 18px 0 0;
    font-size: 14px;
`

const NftOnChainEachData = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`

const NftOnChainLinkStyle = styled.div`
    color: #431216;
    font-weight: 500;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
`

const web3 = new Web3(Web3.givenProvider)

export interface NftDataRightComponentInterface {
    itemId?: string;
  }

const NftDataRightComponent = ({itemId} : NftDataRightComponentInterface) => {
    const { isDark, toggleTheme } = useTheme()
    const { account} = useWallet()
    const [tokenId, setTokenId] = useState('');
    const [ownerAddress, setOwnerAddress] = useState('');
    const [dna, setDna] = useState('');
    const [background, setBackground] = useState('');
    const [body, setBody] = useState('');
    const [clothes, setClothes] = useState('');
    const [neck, setNeck] = useState('');
    const [mouth, setMouth] = useState('');
    const [eyes, setEyes] = useState('');
    const [horns, setHorns] = useState('');
    const [head, setHead] = useState('');

    const marketContract = useMemo(() => {
        return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
    }, []);

    const happyCowsContract = useMemo(() => {
        return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
    }, []);


    const fetchNft = useCallback(async ()=>{
        const marketItems = await marketContract.methods.fetchMarketItems().call({from:account});
        let index = 0;
        for(let i = 0;i < marketItems.length; i ++) {
            if(marketItems[i].itemId === itemId) {
                setTokenId(marketItems[i].tokenId.toString());
                setOwnerAddress(marketItems[i].seller.toString());
                index = i;
                break;
            }
        }
        const nftHash = await happyCowsContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({from:account});
        const res = await fetch(nftHash);
        const json = await res.json();
        setDna(json.dna);
        setBackground(json.attributes[0].value);
        setBody(json.attributes[1].value);
        setClothes(json.attributes[2].value);
        setNeck(json.attributes[3].value);
        setMouth(json.attributes[4].value);
        setEyes(json.attributes[5].value);
        setHorns(json.attributes[6].value);
        setHead(json.attributes[7].value);
    }, [account, marketContract, itemId, happyCowsContract])

    useEffect(() => {
        console.log("Item ID:", itemId);
        fetchNft()
    }, [itemId, fetchNft])
    return (
        <NftOnChainDataContainer>
            <NftOnChainDataTitle style={{color: isDark ? 'white' : ''}}>Properties</NftOnChainDataTitle>
            <NftOnChainDetailContainer>
                <NftOnChainDetail>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Owner</div>
                        <NftOnChainLinkStyle>
                            <Link to="/" style={{textDecoration: 'underline', color: isDark ? 'white' : '#431216'}}>
                                {ownerAddress}
                            </Link>
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Contract Address</div>
                        <NftOnChainLinkStyle>
                            <Link to="/" style={{textDecoration: 'underline', color: isDark ? 'white' : '#431216'}}>
                                {getHappyCowAddress()}
                            </Link>
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Token ID</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {`#${tokenId}`}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    {/* <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset Protocol</div>
                        <NftOnChainLinkStyle>
                            ERC721
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset public chain</div>
                        <NftOnChainLinkStyle>
                            BSC
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData> */}
                     <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>DNA</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {dna}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Background</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {background}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Body</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {body}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Clothes</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {clothes}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Neck</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {neck}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Mouth</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {mouth}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Eyes</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {eyes}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Horns</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {horns}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Head</div>
                        <NftOnChainLinkStyle style={{color: isDark ? 'white' : ''}}>
                            {head}
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                </NftOnChainDetail>
            </NftOnChainDetailContainer>
        </NftOnChainDataContainer>
    )
}

export default NftDataRightComponent
