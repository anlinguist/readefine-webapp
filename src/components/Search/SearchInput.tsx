import { CloseButton, Divider, Stack, TextInput } from '@mantine/core';
import classes from './SearchInput.module.css';

function SearchInput({ q, setQ, placeholder, noBorder = false }: any) {
    return (
        <Stack flex={1} gap={0}>
            <TextInput
                id="search-form"
                classNames={{
                    root: classes.searchroot,
                    wrapper: classes.searchwrapper,
                    input: noBorder ? classes.searchinputnb : classes.searchinput
                }}
                value={q}
                placeholder={placeholder ? placeholder : "Search"}
                onChange={(event) => setQ(event.currentTarget.value)}
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setQ('')}
                        style={{ display: q ? undefined : 'none' }}
                    />
                }
            />
            {
                noBorder &&
                <Divider />
            }
        </Stack>
    )
}

export default SearchInput