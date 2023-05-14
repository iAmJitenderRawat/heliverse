import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setAvailables, setDomains, setGenders, setSearch } from "../features/properties/propsSlice";

const Filters = () => {
  const { domains, genders, availables, search } = useSelector(
    (state) => state.getProps
  );
  
  const dispatch=useDispatch();

  return (
    <div>
      <Flex
        my={5}
        mx={3}
        gap={5}
        flexDir={{
          base: "column",
          sm: "column",
          md: "row",
        }}
      >
        <Select
          name="domain"
          value={domains}
          onChange={(e) => dispatch(setDomains(e.target.value))}
          placeholder="Filter by domain"
        >
          <option name={"Sales"} value={"Sales"}>
            Sales
          </option>
          <option name={"Finance"} value={"Finance"}>
            Finance
          </option>
          <option name={"IT"} value={"IT"}>
            IT
          </option>
          <option name={"Marketing"} value={"Marketing"}>
            Marketing
          </option>
          <option name={"Business Development"} value={"Business Development"}>
            Business Development
          </option>
          <option name={"Management"} value={"Management"}>
            Management
          </option>
          <option name={"UI Designing"} value={"UI Designing"}>
            UI Designing
          </option>
        </Select>

        <Select
          value={genders}
          onChange={(e) => dispatch(setGenders(e.target.value))}
          placeholder="Filter by gender"
        >
          <option name={"Female"} value={"Female"}>
            Female
          </option>
          <option name={"Male"} value={"Male"}>
            Male
          </option>
          <option name={"Agender"} value={"Agender"}>
            Agender
          </option>
          <option name={"Bigender"} value={"Bigender"}>
            Bigender
          </option>
          <option name={"Polygender"} value={"Polygender"}>
            Polygender
          </option>
          <option name={"Non-binary"} value={"Non-binary"}>
            Non-binary
          </option>
          <option name={"Genderfluid"} value={"Genderfluid"}>
            Genderfluid
          </option>
          <option name={"Genderqueer"} value={"Genderqueer"}>
            Genderqueer
          </option>
        </Select>

        <Select
          value={availables}
          onChange={(e) => dispatch(setAvailables(e.target.value))}
          placeholder="Filter by available"
        >
          <option name={"true"} value={"true"}>
            true
          </option>
          <option name={"false"} value={"false"}>
            false
          </option>
        </Select>
      </Flex>
        <Flex gap={2} m={3}>
          <Input
            type="text"
            name="search"
            value={search} 
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search by name, email, domain, gender, available"
          />
          <Button colorScheme={"blackAlpha"} onClick={()=>dispatch(setSearch(""))}>Reset</Button>
        </Flex>
    </div>
  );
};

export default Filters;
