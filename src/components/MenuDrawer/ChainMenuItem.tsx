import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import simulationState from "../../atoms/simulationState";
import CodesMenuItem from "./CodesMenuItem";
import T1MenuItem from "./T1MenuItem";

export interface IChainMenuItemProps {
  chainId: string;
}
export default function ChainMenuItem(props: IChainMenuItemProps) {
  const {
    chainId,
  } = props;
  
  const [showDelChain, setShowDelChain] = useState(false);
  
  return (
    <T1MenuItem
      key={chainId}
      nodeId={`chains/${chainId}`}
      link={`/chains/${chainId}`}
      label={chainId}
      options={[
        <MenuItem key="remove-chain" onClick={() => {setShowDelChain(true)}}>Remove</MenuItem>
      ]}
      optionsExtras={({ close }) => [
        <DeleteChainDialog
          key="remove-chain"
          chainId={chainId}
          open={showDelChain}
          onClose={() => {
            setShowDelChain(false);
            close();
          }}
        />
      ]}
    >
      <CodesMenuItem chainId={chainId} />
    </T1MenuItem>
  )
}

interface IDeleteChainDialogProps {
  chainId: string;
  open: boolean;
  onClose(): void;
}
function DeleteChainDialog(props: IDeleteChainDialogProps) {
  const {
    chainId,
    ...rest
  } = props;
  
  const deleteChain = useDeleteChain();
  
  return (
    <Dialog {...rest}>
      <DialogTitle>Confirm Chain Removal</DialogTitle>
      <DialogContent>
        Are you absolutely certain you wish to remove chain {chainId}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => {rest.onClose()}}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteChain(chainId);
            rest.onClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function useDeleteChain() {
  const setSimulation = useSetRecoilState(simulationState);
  return useCallback((chainId: string) => {
    setSimulation(prev => ({
      ...prev,
      simulation: {
        ...prev.simulation,
        chains: [
          ...prev.simulation.chains.filter(chain => chain.chainId !== chainId),
        ],
      },
    }));
  }, []);
}
