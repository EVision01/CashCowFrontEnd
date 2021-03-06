import React from 'react'
import { useDispatch } from 'react-redux'
import { setSortOrder, setCollectionType } from 'state/markets'
import styled from 'styled-components'
import { convertCompilerOptionsFromJson } from 'typescript'
import useTheme from 'hooks/useTheme'
import Select from '../../../components/Select/Select'

const NftHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

`
const LeftContainer = styled.div`
    flex: left;
    align-items: center;
`


const RightContainer = styled.div`
    display: flex;
    flex: right;
    align-items: center;
`

const SearchBox = styled.div`
    display: flex;
    position: relative;
`

const InputTag = styled.input`
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    font-size: 16px;
    padding: 0 68px 0 16px;
    display: flex;
    outline: none;
    width: 230px;
    color: #431216;
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const LinkTag = styled.a`
    position: absolute;
    right: 4px;
    top: 4px;
    bottom: 4px;
    height: auto;
    padding: 0 20px;
    transform: translateY(0)!important;
    border: 0 none;
    background: #fad551;
    border-radius: 12px;
    display: flex;
    align-items: center;
`

const handleChange = (option) => {
  console.log(option);
  }

const sortByItems = [
    { label: 'Recently listed', value: { field: 'RecentlyListed', direction: 'desc' } },
    { label: 'Lowest price', value: { field: 'LowestPrice', direction: 'asc' } },
    { label: 'Highest price', value: { field: 'HighestPrice', direction: 'desc' } },
  ]

const filterByCollection = [
    { label: 'All NFTs', value: { field: 'All', direction: 'asc' } },
    { label: 'Happy Cows', value: { field: 'HappyCows', direction: 'desc' } },
    { label: 'Crazy Cows', value: { field: 'CrazyCows', direction: 'asc' } },
]



const NftHeader = () => {
    const dispatch = useDispatch()
    const { isDark, toggleTheme } = useTheme()

    return (
        <NftHeaderContainer>
            <LeftContainer style={{color: isDark ? 'white' : ''}}>
                Nft Marketplace
            </LeftContainer>
            <RightContainer>
                <Select
                    options={sortByItems}
                    onOptionChange={(option) => dispatch(setSortOrder(option.value))}
                    style={{marginRight: '15px', background: isDark ? '#27262c' : ''}}
                />
                <Select
                    options={filterByCollection}
                    onOptionChange={(option) => dispatch(setCollectionType(option.value))}
                    style={{marginRight: '15px'}}
                />
                <SearchBox>
                    <InputTag placeholder="Please enter keywords to search" />
                    <LinkTag>
                        <img alt="search icon" src="https://jojo.fun/img/icon-search.eaf98785.svg"/>
                    </LinkTag>
                </SearchBox>
            </RightContainer>
        </NftHeaderContainer>
    )
}

export default NftHeader
