import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { createLazyFileRoute } from '@tanstack/react-router';
import { alert, confirm } from '@/components/shared/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Welcome Home!</h1>
      <p className='text-muted-foreground'>
        This is the apps home page with the shared sidebar layout.
      </p>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-muted/50 flex items-center justify-center'>
          <span className='text-sm text-muted-foreground'>Card 1</span>
        </div>
        <div className='aspect-video rounded-xl bg-muted/50 flex items-center justify-center'>
          <span className='text-sm text-muted-foreground'>Card 2</span>
        </div>
        <div className='aspect-video rounded-xl bg-muted/50 flex items-center justify-center'>
          <span className='text-sm text-muted-foreground'>Card 3</span>
        </div>
        <InputGroup>
          <InputGroupInput
            id='link-title'
            className='h-11 border-0 outline-0'
            placeholder='e.g., Q4 Campaign Landing, Product Launch'
          />
        </InputGroup>
      </div>

      <div className="flex gap-4">
        <Button onClick={async () => {
            await alert({ title: 'Alert Test', description: 'This is a test alert.' });
        }}>
          Test Alert
        </Button>
        <Button onClick={async () => {
             const result = await confirm({ title: 'Confirm Test', description: 'Do you want to proceed?' });
             if (result) {
                 toast.success('You clicked Continue.');
                 await alert({ title: 'Confirmed', description: 'You clicked Continue.' });
             } else {
                 await alert({ title: 'Cancelled', description: 'You clicked Cancel.' });
             }
        }}>
          Test Confirm
        </Button>
      </div>
    </div>
  );
}
