import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvreoydqjuajwaigjveu.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cmVveWRxanVhandhaWdqdmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MDg0MTksImV4cCI6MTk4MTA4NDQxOX0.YkTLqOR4BmaNy5gWe4gufV6Z45pRMT6XUXKzZ5DbR5Q';

export default createClient(supabaseUrl, supabaseAnonToken);
